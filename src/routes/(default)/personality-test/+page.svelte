<script lang="ts">
	const { data } = $props();
	let type_of_question = $state(0);
	let number_of_questions = $state(0);

	const handleNextQuestion = () => {
		if (
			type_of_question >= data.questions.length - 1 &&
			number_of_questions >= data.questions[type_of_question].question.length - 1
		) {
			return;
		}

		if (number_of_questions < data.questions[type_of_question].question.length - 1) {
			number_of_questions += 1;
		} else {
			type_of_question += 1;
			number_of_questions = 0;
		}
	};
</script>

<div class="m-16 flex h-[38rem] max-w-full flex-col gap-5">
	<div
		class="flex h-12 w-12 items-center justify-center rounded-xs bg-gray-600 text-center text-2xl font-semibold"
	>
		<p>{data.questions[type_of_question].dimension.toUpperCase()}</p>
	</div>
	<div class="bordepx-10 flex h-1/2 items-center justify-center text-center text-wrap">
		<p class="text-3xl font-semibold max-md:text-xl">
			{data.questions[type_of_question].question[number_of_questions]}
		</p>
	</div>
	<div class="flex h-1/2 gap-3 max-md:flex-col-reverse">
		<button
			onclick={handleNextQuestion}
			class="grow cursor-pointer rounded-xs bg-red-300 px-3 text-2xl font-semibold">No</button
		>
		<button
			onclick={handleNextQuestion}
			class="grow cursor-pointer rounded-xs bg-blue-300 px-3 text-2xl font-semibold">Yes</button
		>
	</div>
</div>
