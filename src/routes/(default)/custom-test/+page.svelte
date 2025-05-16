<script lang="ts">
	import { Meter, useId } from 'bits-ui';
	import { fade } from 'svelte/transition';
	const { data } = $props();

	let value = $state(0);
	const labelId = useId();

	const max = 100;
	const min = 0;

	const usedPercentage = $derived((value / max) * 100);
	const percentageRemaining = $derived(max - usedPercentage);

	// State to track if user has uploaded a CSV and test has started
	let hasUploadedCsv = $state(false);
	let isProcessingCsv = $state(false);
	let csvError = $state('');
	let questionsData = $state<
		{
			dimension: string;
			questions: string[];
		}[]
	>([]);

	let recommendations = $state(data.recommendations);

	const color = $derived.by(() => {
		if (percentageRemaining > 50) return 'bg-red-500 dark:bg-red-400';
		if (percentageRemaining > 30) return 'bg-orange-500 dark:bg-orange-400';
		if (percentageRemaining > 15) return 'bg-yellow-500 dark:bg-yellow-400';
		return 'bg-green-500 dark:bg-green-400';
	});

	// State variables to track the current question and answer
	let type_of_question = $state(0);
	let number_of_questions = $state(0);

	let yes_count = $state({
		e: 0,
		i: 0,
		s: 0,
		n: 0,
		t: 0,
		f: 0,
		j: 0,
		p: 0
	});

	const mbti_results = $derived.by(() => {
		let result = '';
		if (yes_count.e > yes_count.i) {
			result += 'E';
		} else {
			result += 'I';
		}

		if (yes_count.s > yes_count.n) {
			result += 'S';
		} else {
			result += 'N';
		}

		if (yes_count.t > yes_count.f) {
			result += 'T';
		} else {
			result += 'F';
		}

		if (yes_count.j > yes_count.p) {
			result += 'J';
		} else {
			result += 'P';
		}
		return result;
	});

	// Function to parse CSV text
	function parseCSV(csvText: string) {
		// Split the CSV text into lines
		const lines = csvText.trim().split(/\r?\n/);
		if (lines.length === 0) return [];

		// Get the header row and extract column names
		const headers = lines[0].split(',').map((header) => header.trim());
		const dimensionIndex = headers.indexOf('dimension');
		const questionIndex = headers.indexOf('question');

		// Check if the required columns exist
		if (dimensionIndex === -1 || questionIndex === -1) {
			throw new Error('CSV must have "dimension" and "question" columns');
		}

		// Parse the data rows
		const records = [];
		for (let i = 1; i < lines.length; i++) {
			if (!lines[i].trim()) continue; // Skip empty lines

			// Split line by commas, but handle commas within quotes
			const values = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
			// Remove quotes and trim values
			const cleanValues = values.map((val) => val.replace(/^"|"$/g, '').trim());

			if (cleanValues.length > Math.max(dimensionIndex, questionIndex)) {
				records.push({
					dimension: cleanValues[dimensionIndex],
					question: cleanValues[questionIndex]
				});
			}
		}

		return records;
	}

	// Function to process CSV file upload
	async function handleCsvUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (!file) {
			csvError = 'Please select a CSV file';
			return;
		}

		// Check if file is CSV
		if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
			csvError = 'Please upload a valid CSV file';
			return;
		}

		try {
			isProcessingCsv = true;
			csvError = '';

			// Read the file
			const text = await file.text();

			// Parse the CSV data
			interface QuestionRow {
				dimension: string;
				question: string;
			}

			const records = parseCSV(text) as QuestionRow[];

			// Check if we got any records
			if (records.length === 0) {
				csvError = 'No valid questions found in the CSV file.';
				return;
			}

			// Validate the CSV format
			const validDimensions = ['e', 'i', 's', 'n', 't', 'f', 'j', 'p'];
			const invalidRecords = records.filter(
				(row) =>
					!row.dimension || !row.question || !validDimensions.includes(row.dimension.toLowerCase())
			);

			if (invalidRecords.length > 0) {
				csvError =
					'Invalid CSV format. Please ensure it has "dimension" and "question" columns, with valid dimension values (e, i, s, n, t, f, j, p).';
				return;
			}

			// Group questions by dimension
			const questionsByDimension: { [key: string]: string[] } = {};

			for (const row of records) {
				const dimension = row.dimension.toLowerCase();
				if (!questionsByDimension[dimension]) {
					questionsByDimension[dimension] = [];
				}
				questionsByDimension[dimension].push(row.question);
			}

			// Create question lists for each dimension
			questionsData = validDimensions.map((dim) => ({
				dimension: dim,
				questions: questionsByDimension[dim] || []
			}));

			// Check if we have at least one question per dimension
			const hasEnoughQuestions = validDimensions.every(
				(dim) => questionsByDimension[dim]?.length > 0
			);

			if (!hasEnoughQuestions) {
				csvError =
					'Please ensure your CSV has at least one question for each dimension (e, i, s, n, t, f, j, p).';
				return;
			}

			// Reset the test
			type_of_question = 0;
			number_of_questions = 0;
			value = 0;
			yes_count = {
				e: 0,
				i: 0,
				s: 0,
				n: 0,
				t: 0,
				f: 0,
				j: 0,
				p: 0
			};

			// Start the test
			hasUploadedCsv = true;
		} catch (error) {
			console.error('Error processing CSV:', error);
			csvError = `Error processing CSV: ${error instanceof Error ? error.message : String(error)}`;
		} finally {
			isProcessingCsv = false;
		}
	}

	const handleNextQuestion = (event: MouseEvent) => {
		const buttonId = (event.currentTarget as HTMLButtonElement).id;
		const questions = hasUploadedCsv ? questionsData : data.questions;

		// Update the counts based on which button was clicked
		if (buttonId === 'yes-button') {
			const dimension = questions[type_of_question].dimension;
			yes_count[dimension as keyof typeof yes_count] += 1;
		}

		// Move to the next question
		if (
			type_of_question >= questions.length - 1 &&
			number_of_questions >= questions[type_of_question].questions.length - 1
		) {
			return;
		}

		if (number_of_questions < questions[type_of_question].questions.length - 1) {
			number_of_questions += 1;
			// Update the progress meter
			const totalQuestions = questions.reduce((acc, q) => acc + q.questions.length, 0);
			const completedQuestions =
				questions.slice(0, type_of_question).reduce((acc, q) => acc + q.questions.length, 0) +
				number_of_questions +
				1;
			value = Math.floor((completedQuestions / totalQuestions) * 100);
		} else {
			type_of_question += 1;
			number_of_questions = 0;
		}
	};

	// Handle file download for sample CSV
	function downloadSampleCsv() {
		// Sample questions with quotes around text to handle any commas in content
		const sampleCsv =
			'dimension,question\n' +
			'e,"Do you feel energized after spending time with a group of people?"\n' +
			'e,"Do you prefer speaking rather than listening in conversations?"\n' +
			'i,"Do you need time alone to recharge after social activities?"\n' +
			'i,"Do you prefer to work on projects alone rather than in groups?"\n' +
			's,"Do you focus more on facts and details rather than concepts and ideas?"\n' +
			's,"Do you prefer practical solutions over theoretical ones?"\n' +
			'n,"Do you often think about future possibilities?"\n' +
			'n,"Do you enjoy thinking about abstract concepts?"\n' +
			't,"Do you make decisions based on logic rather than feelings?"\n' +
			't,"Do you value truth over tact?"\n' +
			'f,"Do you consider how your decisions will impact others?"\n' +
			'f,"Do you value harmony and cooperation in a team?"\n' +
			'j,"Do you prefer to plan activities well in advance?"\n' +
			'j,"Is having a schedule important to you?"\n' +
			'p,"Do you prefer to keep your options open?"\n' +
			'p,"Do you enjoy spontaneity and flexibility?"';

		const blob = new Blob([sampleCsv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'mbti_sample_questions.csv';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	// We no longer need to check for data.error since we're using client-side CSV parsing
	const hasError = $derived(false); // We'll use csvError instead
</script>

{#if !hasUploadedCsv}
	<div class="flex h-screen w-full items-center justify-center">
		<div class="flex max-w-3xl flex-col items-center justify-center gap-8 p-8">
			<h1 class="text-4xl font-bold">Custom MBTI Test</h1>
			<p class="text-center text-xl">
				Upload your own CSV file with MBTI questions to start the test. The CSV must include
				"dimension" and "question" columns.
			</p>

			<div class="flex w-full flex-col gap-2">
				<div class="flex items-center justify-between">
					<label for="csv-upload" class="text-lg font-medium">Upload CSV File</label>
					<button
						onclick={downloadSampleCsv}
						class="text-sm text-blue-400 underline hover:text-blue-300"
					>
						Download Sample CSV
					</button>
				</div>
				<input
					id="csv-upload"
					type="file"
					accept=".csv"
					onchange={handleCsvUpload}
					class="w-full rounded-sm border border-zinc-700 bg-zinc-800 px-4 py-2 file:mr-4 file:rounded-sm file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-white hover:file:bg-blue-600"
				/>

				{#if csvError}
					<p class="mt-1 text-sm text-red-400">{csvError}</p>
				{/if}
			</div>

			{#if isProcessingCsv}
				<div class="flex items-center justify-center">
					<div
						class="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"
					></div>
					<span class="ml-2">Processing CSV...</span>
				</div>
			{/if}

			<div class="w-full rounded-sm bg-zinc-800 p-5">
				<h3 class="mb-3 text-lg font-bold">CSV Format Requirements:</h3>
				<ul class="list-inside list-disc space-y-2">
					<li>Must have a header row with "dimension" and "question" columns</li>
					<li>
						The "dimension" column should contain one of these values: e, i, s, n, t, f, j, p
						(lowercase)
					</li>
					<li>Each dimension should have at least one question</li>
					<li>
						Example: <code class="rounded-xs bg-zinc-900 px-1"
							>e,Do you enjoy meeting new people?</code
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
{:else if usedPercentage >= 100}
	<div
		transition:fade={{ duration: 1000 }}
		class="flex h-screen w-full items-center justify-center"
	>
		<div class="flex flex-col items-center justify-center gap-5">
			<p class="text-3xl font-semibold">Your MBTI result is:</p>
			<p class="text-4xl font-bold">{mbti_results}</p>
			{#if recommendations[mbti_results.toLowerCase() as keyof typeof recommendations]}
				<p class="text-xl font-medium italic">
					"Your fields in {mbti_results} are: {recommendations[
						mbti_results.toLowerCase() as keyof typeof recommendations
					]}"
				</p>
			{/if}

			<button
				onclick={() => (hasUploadedCsv = false)}
				class="mt-8 rounded-sm bg-blue-500 px-5 py-2 font-medium text-white hover:bg-blue-600"
			>
				Start New Test
			</button>
		</div>
	</div>
{:else if questionsData.length === 0 || questionsData[type_of_question]?.questions.length === 0}
	<div class="flex h-screen w-full items-center justify-center">
		<div class="flex flex-col items-center justify-center gap-5">
			<p class="text-2xl font-semibold">No questions found</p>
			<p class="text-lg">
				Please make sure your CSV file is properly formatted and contains questions.
			</p>

			<button
				onclick={() => (hasUploadedCsv = false)}
				class="mt-4 rounded-sm bg-blue-500 px-5 py-2 font-medium text-white hover:bg-blue-600"
			>
				Upload New CSV File
			</button>
		</div>
	</div>
{:else}
	<div transition:fade={{ duration: 250 }} class="m-16 flex h-[38rem] max-w-full flex-col gap-5">
		<div class="mx-auto flex w-full max-w-3xl justify-between">
			<div
				class="flex h-12 w-12 items-center justify-center rounded-xs bg-gray-600 text-center text-2xl font-semibold"
			>
				<p>{questionsData[type_of_question].dimension.toUpperCase()}</p>
			</div>

			<button
				onclick={() => (hasUploadedCsv = false)}
				class="text-sm text-zinc-400 underline hover:text-white"
			>
				Cancel Test
			</button>
		</div>

		<div
			class="mx-auto flex h-3/5 w-full max-w-3xl items-center justify-center rounded-sm bg-zinc-900 px-10 text-center text-wrap shadow-lg"
		>
			<p class="text-3xl font-semibold max-md:text-xl">
				{questionsData[type_of_question].questions[number_of_questions]}
			</p>
		</div>
		<div class="mx-auto flex h-2/5 w-full max-w-3xl gap-3 max-md:flex-col-reverse">
			<button
				onclick={handleNextQuestion}
				class="grow cursor-pointer rounded-xs bg-red-300 px-3 text-2xl font-semibold active:scale-[0.98] active:transition-all"
				>No</button
			>
			<button
				id="yes-button"
				onclick={handleNextQuestion}
				class="grow cursor-pointer rounded-xs bg-blue-300 px-3 text-2xl font-semibold active:scale-[0.98] active:transition-all"
				>Yes</button
			>
		</div>
		<div class="mx-auto flex w-full max-w-3xl flex-col gap-2">
			<div class="flex items-center justify-between text-sm font-normal">
				<span id={labelId}> Question </span>
				<span class="font-semibold">{value} %</span>
			</div>
			<Meter.Root
				aria-labelledby={labelId}
				aria-valuetext="{value} out of {max}"
				{value}
				{min}
				{max}
				class="shadow-mini-inset relative h-[15px] overflow-hidden rounded-full bg-zinc-900"
			>
				<div
					class="shadow-mini-inset h-full w-full flex-1 rounded-full transition-all duration-1000 ease-in-out {color}"
					style="transform: translateX(-{100 - (100 * (value ?? 0)) / max}%)"
				></div>
			</Meter.Root>
		</div>
	</div>
{/if}
