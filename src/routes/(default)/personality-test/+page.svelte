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

	const dataDescriptionMBTI = [
		[
			{
				dimension: 'Extroversion',
				description:
					'Mendapat energi dari berinteraksi dengan dunia luar dan orang lain. Lebih suka berbicara untuk berpikir.'
			},
			{
				dimension: 'Introversion',
				description:
					'Mendapat energi dari dunia dalam dan refleksi diri. Lebih suka berpikir sebelum berbicara.'
			}
		],
		[
			{
				dimension: 'Sensing',
				description:
					'Fokus pada informasi konkret, fakta, dan detail yang dapat dirasakan oleh panca indra, praktis dan realistis.'
			},
			{
				dimension: 'Intuition',
				description:
					'Fokus pada pola, kemungkinan, dan makna di balik informasi. Imajinatif dan konseptual.'
			}
		],
		[
			{
				dimension: 'Thinking',
				description:
					'Membuat keputusan berdasarkan logika, analisis objektif, dan pertimbangan rasional.'
			},
			{
				dimension: 'Feeling',
				description:
					'Membuat keputusan berdasarkan nilai-nilai pribadi, empati, dan dampak terhadap orang lain.'
			}
		],
		[
			{
				dimension: 'Judging',
				description:
					'Lebih suka struktur, rencana yang jelas, dan keputusan yang tegas. Berorientasi pada hasil.'
			},
			{
				dimension: 'Preceiving',
				description:
					'Lebih suka fleksibilitas, spontanitas, dan tetap terbuka terhadap opsi baru. Berorientasi pada proses.'
			}
		]
	];

	const allPercentages = $derived.by(() => {
		return [
			{
				title: 'Extroversion',
				percentage: Math.round((yes_count.e / 6) * 100)
			},
			{
				title: 'Introversion',
				percentage: Math.round((yes_count.i / 5) * 100)
			},
			{
				title: 'Sensing',
				percentage: Math.round((yes_count.s / 6) * 100)
			},
			{
				title: 'Intuition',
				percentage: Math.round((yes_count.n / 5) * 100)
			},
			{
				title: 'Thinking',
				percentage: Math.round((yes_count.t / 6) * 100)
			},
			{
				title: 'Feeling',
				percentage: Math.round((yes_count.f / 5) * 100)
			},
			{
				title: 'Judging',
				percentage: Math.round((yes_count.j / 6) * 100)
			},
			{
				title: 'Perceiving',
				percentage: Math.round((yes_count.p / 4) * 100)
			}
		];
	});

	// Function to print the MBTI result
	const printResult = () => {
		const printWindow = window.open('', '_blank');
		if (!printWindow) return;

		const recommendations =
			data.recommendations[mbti_results.toLowerCase() as keyof typeof data.recommendations];

		// Generate percentage bars HTML
		const percentageBarsHTML = allPercentages
			.map(
				(item) => `
				<div style="display: flex; align-items: center; margin-bottom: 1rem; gap: 1rem;">
					<div style="width: 120px; font-weight: bold;">${item.title}</div>
					<div style="flex: 1; height: 20px; background-color: #e5e7eb; border-radius: 4px; overflow: hidden;">
						<div style="height: 100%; background-color: #60a5fa; width: ${item.percentage}%; transition: width 0.3s ease;"></div>
					</div>
					<div style="width: 40px; text-align: right; font-weight: bold;">${item.percentage}%</div>
				</div>
			`
			)
			.join('');

		// Generate dimension descriptions HTML
		const dimensionDescriptionsHTML = dataDescriptionMBTI
			.map(
				(dimensionPair) => `
				<div style="margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #d1d5db; border-radius: 8px;">
					<div style="margin-bottom: 1rem;">
						<h4 style="margin: 0 0 0.5rem 0; color: #374151;">${dimensionPair[0].dimension}</h4>
						<p style="margin: 0; font-size: 0.9rem; color: #6b7280;">${dimensionPair[0].description}</p>
					</div>
					<div>
						<h4 style="margin: 0 0 0.5rem 0; color: #374151;">${dimensionPair[1].dimension}</h4>
						<p style="margin: 0; font-size: 0.9rem; color: #6b7280;">${dimensionPair[1].description}</p>
					</div>
				</div>
			`
			)
			.join('');

		printWindow.document.write(`
			<html>
				<head>
					<title>Your MBTI Result - ${mbti_results}</title>
					<style>
						body {
							font-family: Arial, sans-serif;
							line-height: 1.6;
							max-width: 900px;
							margin: 0 auto;
							padding: 2rem;
							color: #333;
						}
						.header {
							text-align: center;
							margin-bottom: 2rem;
							border-bottom: 2px solid #e5e7eb;
							padding-bottom: 1rem;
						}
						.result {
							text-align: center;
							margin-bottom: 2rem;
							padding: 1.5rem;
							background-color: #f9fafb;
							border-radius: 8px;
						}
						.mbti {
							font-size: 4rem;
							font-weight: bold;
							margin: 1rem 0;
							color: #3b82f6;
							text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
						}
						.section {
							margin-bottom: 2rem;
						}
						.section-title {
							font-size: 1.5rem;
							font-weight: bold;
							margin-bottom: 1rem;
							color: #374151;
							border-left: 4px solid #3b82f6;
							padding-left: 1rem;
						}
						.recommendations {
							background-color: #fef3c7;
							padding: 1.5rem;
							border-radius: 8px;
							border-left: 4px solid #f59e0b;
							margin: 1rem 0;
						}
						.percentages {
							background-color: #fff;
							padding: 1.5rem;
							border-radius: 8px;
							border: 1px solid #e5e7eb;
						}
						.footer {
							margin-top: 3rem;
							text-align: center;
							font-size: 0.8rem;
							color: #6b7280;
							border-top: 1px solid #e5e7eb;
							padding-top: 1rem;
						}
						@media print {
							body { padding: 1rem; }
							.header { margin-bottom: 1rem; }
						}
					</style>
				</head>
				<body>
					<div class="header">
						<h1>Hasil Tes MBTI Personality</h1>
						<p>Dibuat pada ${new Date().toLocaleDateString('id-ID', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}</p>
					</div>

					<div class="result">
						<h2>Tipe Kepribadian Anda:</h2>
						<div class="mbti">${mbti_results}</div>
						<div class="recommendations">
							<p><strong>Bidang yang Direkomendasikan:</strong></p>
							<p style="font-size: 1.1rem; margin: 0.5rem 0;">${recommendations}</p>
							<p style="font-size: 0.9rem; margin-top: 1rem;">
								Berdasarkan hasil tes MBTI, Anda termasuk dalam tipe kepribadian <strong>${mbti_results}</strong>. 
								Tipe ini sangat cocok untuk bidang <strong>${recommendations}</strong> dalam dunia Informatika.
							</p>
						</div>
					</div>

					<div class="section">
						<div class="section-title">📊 Persentase Dimensi Kepribadian</div>
						<div class="percentages">
							${percentageBarsHTML}
						</div>
					</div>

					<div class="section">
						<div class="section-title">📝 Penjelasan Dimensi MBTI</div>
						${dimensionDescriptionsHTML}
					</div>

					<div class="footer">
						<p>Terima kasih telah mengikuti tes kepribadian MBTI.</p>
						<p>Hasil ini dapat membantu Anda memahami preferensi dan kekuatan kepribadian Anda.</p>
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
		<div class="flex w-full max-w-6xl flex-col">
			<!-- card description -->
			<div class="m-2 flex items-start justify-between gap-2">
				{#each dataDescriptionMBTI as data, index (index)}
					<div
						class="flex h-full basis-1/4 flex-col gap-3 rounded-sm border border-gray-400 p-4 text-wrap shadow-sm"
					>
						<div>
							<p class="text-xl font-semibold">{data[0].dimension}</p>
							<p>
								{data[0].description}
							</p>
						</div>
						<div>
							<p class="text-xl font-semibold">{data[1].dimension}</p>
							<p>
								{data[1].description}
							</p>
						</div>
					</div>
				{/each}
			</div>
			<!-- result -->
			<p class="mb-2 p-2 text-3xl font-semibold">Hasil Tes MBTI</p>
			<div class="mb-4 flex items-center justify-between gap-2">
				<!-- chart -->
				<div class="flex h-full basis-3/4 flex-col gap-4 p-2">
					{#each allPercentages as item (item.title)}
						<div class="flex items-center gap-2">
							<p class="w-1/4 font-semibold">{item.title}</p>
							<div class="h-6 flex-1 rounded-sm bg-gray-200">
								<div class="h-full rounded-sm bg-blue-400" style="width: {item.percentage}%"></div>
							</div>
							<p class="w-12 text-right">{item.percentage}%</p>
						</div>
					{/each}
				</div>
				<!-- mbti type -->
				<div class="flex h-full basis-1/4 flex-col items-center justify-center rounded-sm p-4">
					<p class="text-4xl font-bold">{mbti_results}</p>
					<button
						onclick={printResult}
						class="mt-4 rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 active:bg-orange-800"
					>
						Print Result
					</button>
				</div>
			</div>
			<!-- description mbti type and recommendation fields in informatic -->
			<div class="p-2">
				<p class="text-md">
					Berdasarkan hasil tes MBTI, kamu termasuk dalam tipe kepribadian <span
						class="font-semibold">{mbti_results}</span
					>
					. Tipe ini sangat cocok untuk bidang
					<span class="font-semibold"
						>{data.recommendations[
							mbti_results.toLowerCase() as keyof typeof data.recommendations
						]}</span
					> dalam dunia Informatika. Setiap bidang punya tantangan dan keunikan tersendiri, tapi dengan
					kepribadianmu, kamu punya potensi besar untuk berkembang di jalur ini.
				</p>
			</div>
		</div>
	</div>
{:else}
	<div transition:fade={{ duration: 250 }} class="m-16 flex h-[38rem] max-w-full flex-col gap-5">
		<div class="mx-auto flex w-full max-w-3xl justify-between">
			<!-- dimension of question -->
			<div
				class="flex h-12 w-12 items-center justify-center rounded-xs border border-gray-300 text-center text-2xl font-semibold shadow-sm"
			>
				<p>{data.questions[type_of_question].dimension.toUpperCase()}</p>
			</div>
		</div>
		<div
			class="mx-auto flex h-3/5 w-full max-w-3xl items-center justify-center rounded-sm border border-gray-300 px-10 text-center text-wrap shadow-sm"
		>
			<!-- question  -->
			<p class="text-3xl font-semibold max-md:text-xl">
				{data.questions[type_of_question].questions[number_of_questions].question}
			</p>
		</div>
		<!-- handle answer -->
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
		<!-- percentage meter -->
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
