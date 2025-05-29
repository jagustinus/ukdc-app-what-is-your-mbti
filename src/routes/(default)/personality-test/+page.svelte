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
		class="flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 md:px-8"
	>
		<div class="flex w-full max-w-6xl flex-col">
			<p class="mb-4 p-2 text-start text-2xl font-semibold md:mb-2 md:text-3xl">
				Penjelasan Dimensi MBTI
			</p>
			<!-- card description -->
			<div class="m-2 flex flex-col gap-4 md:flex-row md:items-stretch md:justify-between md:gap-2">
				{#each dataDescriptionMBTI as data, index (index)}
					<div
						class="flex flex-col gap-3 rounded-sm border border-gray-400 p-3 text-wrap shadow-sm md:basis-1/4 md:p-4"
					>
						<div>
							<p class="text-lg font-semibold md:text-xl">{data[0].dimension}</p>
							<p class="text-sm md:text-base">
								{data[0].description}
							</p>
						</div>
						<div>
							<p class="text-lg font-semibold md:text-xl">{data[1].dimension}</p>
							<p class="text-sm md:text-base">
								{data[1].description}
							</p>
						</div>
					</div>
				{/each}
			</div>

			<!-- result -->
			<p class="mb-4 p-2 text-2xl font-semibold md:mb-2 md:text-3xl">Hasil Tes MBTI</p>

			<!-- Mobile: MBTI Type at top -->
			<div class="mb-6 block p-2 md:hidden">
				<div
					class="flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-6 shadow-sm"
				>
					<p class="text-5xl font-bold text-blue-600 md:text-4xl">{mbti_results}</p>
					<button
						onclick={printResult}
						class="mt-4 w-full rounded-md bg-orange-600 px-4 py-3 text-lg font-medium text-white hover:bg-orange-700 active:bg-orange-800 md:w-auto md:px-4 md:py-2 md:text-base"
					>
						Print Result
					</button>
				</div>
			</div>

			<div class="mb-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-2">
				<!-- chart -->
				<div class="flex h-full flex-col gap-3 p-2 md:basis-3/4 md:gap-4">
					{#each allPercentages as item (item.title)}
						<div class="flex items-center gap-2 md:gap-2">
							<p class="w-20 text-sm font-semibold md:w-1/4 md:text-base">{item.title}</p>
							<div class="h-5 flex-1 rounded-sm bg-gray-200 md:h-6">
								<div
									class="h-full rounded-sm bg-blue-400 transition-all duration-300"
									style="width: {item.percentage}%"
								></div>
							</div>
							<p class="w-12 text-right text-sm font-medium md:text-base">{item.percentage}%</p>
						</div>
					{/each}
				</div>

				<!-- mbti type - Desktop only -->
				<div
					class="hidden h-full flex-col items-center justify-center rounded-sm p-4 md:flex md:basis-1/4"
				>
					<p class="text-4xl font-bold text-blue-600">{mbti_results}</p>
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
				<p class="text-sm leading-relaxed md:text-base">
					Berdasarkan hasil tes MBTI, kamu termasuk dalam tipe kepribadian <span
						class="font-semibold text-blue-600">{mbti_results}</span
					>
					. Tipe ini sangat cocok untuk bidang
					<span class="font-semibold text-orange-600"
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
	<div
		transition:fade={{ duration: 250 }}
		class="flex min-h-screen w-full flex-col gap-4 bg-zinc-100 px-4 py-6 md:gap-5 md:px-16 md:py-16"
	>
		<div
			class="mx-auto mb-3 flex h-auto w-full max-w-3xl items-center rounded-sm border border-amber-300 bg-amber-100 p-4 shadow-sm md:h-24"
		>
			<p class="text-sm text-amber-900 md:text-base">
				Tidak ada jawaban benar atau salah — pilih yang paling menggambarkan kamu!
			</p>
		</div>
		<div class="mx-auto flex w-full max-w-3xl justify-between">
			<!-- alert -->
			<!-- dimension of question -->
			<div
				class="flex h-10 w-10 items-center justify-center rounded-xs border border-gray-300 bg-white text-center text-lg font-semibold shadow-sm md:h-12 md:w-12 md:text-2xl"
			>
				<p>{data.questions[type_of_question].dimension.toUpperCase()}</p>
			</div>
		</div>
		<div
			class="mx-auto flex min-h-[250px] w-full max-w-3xl items-center justify-center rounded-sm border border-gray-300 bg-white px-4 py-6 text-center shadow-sm md:min-h-[300px] md:px-10 md:py-8"
		>
			<!-- question  -->
			<p class="text-base leading-relaxed font-semibold md:text-3xl">
				{data.questions[type_of_question].questions[number_of_questions].question}
			</p>
		</div>
		<!-- handle answer -->
		<div class="mx-auto flex w-full max-w-3xl flex-col gap-3 md:flex-row">
			<button
				onclick={handleNextQuestion}
				class="order-2 grow cursor-pointer rounded-xs bg-red-300 px-3 py-4 text-base font-semibold transition-all active:scale-[0.98] md:order-1 md:basis-1/2 md:text-xl"
			>
				{data.questions[type_of_question].questions[number_of_questions].answer.answer_no}
			</button>
			<button
				id="yes-button"
				onclick={handleNextQuestion}
				class="order-1 grow cursor-pointer rounded-xs bg-blue-300 px-3 py-4 text-base font-semibold transition-all active:scale-[0.98] md:order-2 md:basis-1/2 md:text-xl"
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
