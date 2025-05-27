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

	const handleNextQuestion = (event: MouseEvent) => {
		const buttonId = (event.currentTarget as HTMLButtonElement).id;

		// Update the counts based on which button was clicked
		if (buttonId === 'yes-button') {
			const dimension = data.questions[type_of_question].dimension;
			yes_count[dimension as keyof typeof yes_count] += 1;
		}

		// Move to the next question
		if (
			type_of_question >= data.questions.length - 1 &&
			number_of_questions >= data.questions[type_of_question].questions.length - 1
		) {
			return;
		}

		if (number_of_questions < data.questions[type_of_question].questions.length - 1) {
			number_of_questions += 1;
			// Update the progress meter
			const totalQuestions = data.questions.reduce((acc, q) => acc + q.questions.length, 0);
			const completedQuestions =
				data.questions.slice(0, type_of_question).reduce((acc, q) => acc + q.questions.length, 0) +
				number_of_questions +
				1;
			value = Math.floor((completedQuestions / totalQuestions) * 100);
		} else {
			type_of_question += 1;
			number_of_questions = 0;
		}
	};

	// Function to print the MBTI result
	const printResult = () => {
		const printWindow = window.open('', '_blank');
		if (!printWindow) return;

		const recommendations = data.recommendations[mbti_results.toLowerCase() as keyof typeof data.recommendations];

		printWindow.document.write(`
			<html>
				<head>
					<title>Your MBTI Result</title>
					<style>
						body {
							font-family: Arial, sans-serif;
							line-height: 1.6;
							max-width: 800px;
							margin: 0 auto;
							padding: 2rem;
						}
						.header {
							text-align: center;
							margin-bottom: 2rem;
						}
						.result {
							text-align: center;
							margin-bottom: 1.5rem;
						}
						.mbti {
							font-size: 3rem;
							font-weight: bold;
							margin: 1rem 0;
						}
						.recommendations {
							font-style: italic;
							margin-top: 1rem;
						}
						.footer {
							margin-top: 3rem;
							text-align: center;
							font-size: 0.8rem;
							color: #666;
						}
					</style>
				</head>
				<body>
					<div class="header">
						<h1>Your MBTI Personality Test Result</h1>
						<p>Generated on ${new Date().toLocaleDateString()}</p>
					</div>
					<div class="result">
						<h2>Your personality type is:</h2>
						<div class="mbti">${mbti_results}</div>
						<div class="recommendations">
							<p>"You fields in ${mbti_results} are: ${recommendations}"</p>
						</div>
					</div>
					<div class="footer">
						<p>Thank you for taking the MBTI personality test.</p>
					</div>
				</body>
			</html>
		`);

		printWindow.document.close();
		printWindow.print();
	};

</script>

<svelte:head>
	<title>Personality Test</title>
</svelte:head>

{#if usedPercentage >= 100}
	<div
		transition:fade={{ duration: 1000 }}
		class="flex h-screen w-full flex-col items-center justify-center"
	>
		<div class="flex flex-col items-center justify-center gap-5 text-center">
			<p class="text-3xl font-semibold">Your MBTI result is:</p>
			<p class="text-4xl font-bold">{mbti_results}</p>
			{#if data.recommendations[mbti_results.toLowerCase() as keyof typeof data.recommendations]}{/if}
			<p class="text-xl font-medium italic">
				"You fields in {mbti_results} are: {data.recommendations[
					mbti_results.toLowerCase() as keyof typeof data.recommendations
				]}"
			</p>

			<!-- Print and Download buttons -->
			<div class="mt-8 flex gap-4">
				<button
					onclick={printResult}
					class="rounded-md bg-orange-600 px-6 py-3 text-white hover:bg-orange-700 active:bg-orange-800"
				>
          Print Result
				</button>
			</div>
		</div>
	</div>
{:else}
	<div transition:fade={{ duration: 250 }} class="m-16 flex h-[38rem] max-w-full flex-col gap-5">
		<div class="mx-auto flex w-full max-w-3xl justify-between">
			<div
				class="flex h-12 w-12 items-center justify-center rounded-xs bg-gray-600 text-center text-2xl font-semibold text-zinc-100"
			>
				<p>{data.questions[type_of_question].dimension.toUpperCase()}</p>
			</div>
		</div>
		<div
			class="mx-auto flex h-3/5 w-full max-w-3xl items-center justify-center rounded-sm bg-zinc-400 px-10 text-center text-wrap shadow-lg"
		>
			<p class="text-3xl font-semibold max-md:text-xl">
				{data.questions[type_of_question].questions[number_of_questions].question}
			</p>
		</div>
		<div class="mx-auto flex h-2/5 w-full max-w-3xl gap-3 max-md:flex-col-reverse">
			<button
				onclick={handleNextQuestion}
				class="grow basis-1/2 cursor-pointer rounded-xs bg-red-300 px-3 py-4 text-xl font-semibold active:scale-[0.98] active:transition-all"
			>
				{data.questions[type_of_question].questions[number_of_questions].answer.answer_no}
			</button>
			<button
				id="yes-button"
				onclick={handleNextQuestion}
				class="grow basis-1/2 cursor-pointer rounded-xs bg-blue-300 px-3 py-4 text-xl font-semibold active:scale-[0.98] active:transition-all"
			>
				{data.questions[type_of_question].questions[number_of_questions].answer.answer_yes}
			</button>
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
				class="shadow-mini-inset relative h-[15px] overflow-hidden rounded-full bg-zinc-300"
			>
				<div
					class="shadow-mini-inset h-full w-full flex-1 rounded-full transition-all duration-1000 ease-in-out {color}"
					style="transform: translateX(-{100 - (100 * (value ?? 0)) / max}%)"
				></div>
			</Meter.Root>
		</div>
	</div>
{/if}
