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

  const percentageResulstExt = $derived.by(() => {
    return Math.round(yes_count.e / 6 * 100)
  });
  
  const percentageResulstIvt = $derived.by(() => {
    return Math.round(yes_count.i / 6 * 100)
  });

  const percentageResulstSen = $derived.by(() => {
    return Math.round(yes_count.s / 6 * 100)
  });
  
  const percentageResulstInt = $derived.by(() => {
    return Math.round(yes_count.n / 6 * 100)
  });

  const percentageResulstThi = $derived.by(() => {
    return Math.round(yes_count.t / 6 * 100)
  });

  const percentageResulstFel = $derived.by(() => {
    return Math.round(yes_count.f / 6 * 100)
  });

  const percentageResulstJud = $derived.by(() => {
    return Math.round(yes_count.j / 6 * 100)
  });

  const percentageResulstPer = $derived.by(() => {
    return Math.round(yes_count.p / 6 * 100)
  });

  $inspect(percentageResulstExt);

	// Function to print the MBTI result
	const printResult = () => {
		const printWindow = window.open('', '_blank');
		if (!printWindow) return;

		const recommendations =
			data.recommendations[mbti_results.toLowerCase() as keyof typeof data.recommendations];

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
		<div class="flex flex-col max-w-6xl w-full">
      <!-- card description -->
      <div class="flex justify-between items-start m-2 gap-2">
        <div class="flex flex-col p-4 border border-gray-400 basis-1/4 gap-3 h-full rounded-sm shadow-sm text-wrap">
          <div>
            <p class="font-semibold text-xl">Extroversion</p>
            <p>Mendapat energi dari berinteraksi dengan dunia luar dan orang lain. Lebih suka berbicara untuk berpikir.</p>
          </div>
          <div>
            <p class="font-semibold text-xl">Introversion</p>
            <p>Mendapat energi dari dunia dalam dan refleksi diri. Lebih suka berpikir sebelum berbicara.</p>
          </div>
        </div> 
        <div class="flex flex-col p-4 border border-gray-400 basis-1/4 gap-3 h-full rounded-sm shadow-sm text-wrap">
          <div>
            <p class="font-semibold text-xl">Sensing</p>
            <p>Fokus pada informasi konkret, fakta, dan detail yang dapat dirasakan oleh panca indra. Praktis dan realistis.</p>
          </div>
          <div>
            <p class="font-semibold text-xl">Intuition</p>
            <p>Fokus pada pola, kemungkinan, dan makna di balik informasi. Imajinatif dan konseptual.</p>
          </div>
        </div> 
        <div class="flex flex-col p-4 border border-gray-400 basis-1/4 gap-3 h-full rounded-sm shadow-sm text-wrap">
          <div>
            <p class="font-semibold text-xl">Thinking</p>
            <p>Membuat keputusan berdasarkan logika, analisis objektif, dan pertimbangan rasional.</p>
          </div>
          <div>
            <p class="font-semibold text-xl">Feeling</p>
            <p>Membuat keputusan berdasarkan nilai-nilai pribadi, empati, dan dampak terhadap orang lain.</p>
          </div>
        </div> 
        <div class="flex flex-col p-4 border border-gray-400 basis-1/4 gap-3 h-full rounded-sm shadow-sm text-wrap">
          <div>
            <p class="font-semibold text-xl">Judging</p>
            <p>Lebih suka struktur, rencana yang jelas, dan keputusan yang tegas. Berorientasi pada hasil.</p>
          </div>
          <div>
            <p class="font-semibold text-xl">Perceiving</p>
            <p>Lebih suka fleksibilitas, spontanitas, dan tetap terbuka terhadap opsi baru. Berorientasi pada proses.</p>
          </div>
        </div> 
      </div>
     <!-- result -->
     <p class="p-2 mb-2 text-3xl font-semibold">Hasil Tes MBTI</p>
     <div class="flex justify-between items-center gap-2 mb-4">
     <!-- chart -->
      <div class="flex flex-col basis-3/4 h-full p-2 gap-4">
        <div class="flex items-center gap-2">
          <p class="font-semibold w-1/4">Extroversion: </p>
          <div class="flex-1 h-6 bg-gray-200 rounded-sm">
            <div 
              class="h-full rounded-sm bg-blue-400" 
              style="width: {percentageResulstExt}%">
            </div>
          </div>
          <p class="w-12 text-right">{percentageResulstExt}%</p>
        </div>
        
        <div class="flex items-center gap-2">
          <p class="font-semibold w-1/4">Introversion: </p>
          <div class="flex-1 h-6 bg-gray-200 rounded-sm">
            <div 
              class="h-full rounded-sm bg-blue-400" 
              style="width: {percentageResulstIvt}%">
            </div>
          </div>
          <p class="w-12 text-right">{percentageResulstIvt}%</p>
        </div>
        
        <div class="flex items-center gap-2">
          <p class="font-semibold w-1/4">Sensing: </p>
          <div class="flex-1 h-6 bg-gray-200 rounded-sm">
            <div 
              class="h-full rounded-sm bg-blue-400" 
              style="width: {percentageResulstSen}%">
            </div>
          </div>
          <p class="w-12 text-right">{percentageResulstSen}%</p>
        </div>
        
        <div class="flex items-center gap-2">
          <p class="font-semibold w-1/4">Intuition: </p>
          <div class="flex-1 h-6 bg-gray-200 rounded-sm">
            <div 
              class="h-full rounded-sm bg-blue-400" 
              style="width: {percentageResulstInt}%">
            </div>
          </div>
          <p class="w-12 text-right">{percentageResulstInt}%</p>
        </div>
        
        <div class="flex items-center gap-2">
          <p class="font-semibold w-1/4">Thinking: </p>
          <div class="flex-1 h-6 bg-gray-200 rounded-sm">
            <div 
              class="h-full rounded-sm bg-blue-400" 
              style="width: {percentageResulstThi}%">
            </div>
          </div>
          <p class="w-12 text-right">{percentageResulstThi}%</p>
        </div>
        
        <div class="flex items-center gap-2">
          <p class="font-semibold w-1/4">Feeling: </p>
          <div class="flex-1 h-6 bg-gray-200 rounded-sm">
            <div 
              class="h-full rounded-sm bg-blue-400" 
              style="width: {percentageResulstFel}%">
            </div>
          </div>
          <p class="w-12 text-right">{percentageResulstFel}%</p>
        </div>
        
        <div class="flex items-center gap-2">
          <p class="font-semibold w-1/4">Judging: </p>
          <div class="flex-1 h-6 bg-gray-200 rounded-sm">
            <div 
              class="h-full rounded-sm bg-blue-400" 
              style="width: {percentageResulstJud}%">
            </div>
          </div>
          <p class="w-12 text-right">{percentageResulstJud}%</p>
        </div>
        
        <div class="flex items-center gap-2">
          <p class="font-semibold w-1/4">Perceiving: </p>
          <div class="flex-1 h-6 bg-gray-200 rounded-sm">
            <div 
              class="h-full rounded-sm bg-blue-400" 
              style="width: {percentageResulstPer}%">
            </div>
          </div>
          <p class="w-12 text-right">{percentageResulstPer}%</p>
        </div>
      </div>
      <!-- mbti type -->
      <div class="flex flex-col basis-1/4 h-full p-4 justify-center items-center rounded-sm">
        <p class="text-4xl font-bold">INTJ</p>
        <button
          onclick={printResult}
          class="rounded-md bg-orange-600 px-4 py-2 mt-4 text-white hover:bg-orange-700 active:bg-orange-800">
          Print Result
        </button>
      </div>
     </div>
     <!-- description mbti type and recommendation fields in informatic -->
     <div class="p-2">
      <p class="text-md">
        Berdasarkan hasil tes MBTI, kamu termasuk dalam tipe kepribadian <span class="font-semibold">{mbti_results}</span> . Tipe ini sangat cocok untuk bidang <span class="font-semibold">{data.recommendations[mbti_results.toLowerCase() as keyof typeof data.recommendations]}</span> dalam dunia Informatika. Setiap bidang punya tantangan dan keunikan tersendiri, tapi dengan kepribadianmu, kamu punya potensi besar untuk berkembang di jalur ini.
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
