<script lang="ts">
	import { fade } from 'svelte/transition';
	const { data } = $props();

	let mbti = $state('');
	let hasSubmitted = $state(false);
</script>

<svelte:head>
	<title>Recommend Fields</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-4 py-8">
	<div
		class="flex w-full max-w-md flex-col items-center text-center sm:max-w-lg md:max-w-xl lg:max-w-2xl"
	>
		<h1 class="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">Rekomendasi Bidang Informatika</h1>
		<p class="mb-6 text-sm sm:text-base">
			Cek tipe MBTI mu, dan lihat rekomendasi bidang yang cocok pada Informatika
		</p>
		<div class="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
			<input
				bind:value={mbti}
				oninput={() => (hasSubmitted = false)}
				type="text"
				placeholder="Apa tipe MBTI mu ?"
				class="w-full rounded-sm border-2 border-zinc-700 bg-transparent p-3 text-sm text-zinc-800 placeholder:text-gray-500 focus:border-gray-500 focus:outline-none sm:m-2 sm:text-base"
			/>
			<button
				onclick={() => (hasSubmitted = true)}
				class="w-full cursor-pointer rounded-sm border-2 border-transparent bg-orange-500 px-4 py-3 text-sm font-normal text-white transition-all active:scale-[0.98] sm:w-auto sm:text-base"
				>Kirim
			</button>
		</div>
		{#if hasSubmitted && data.recommend_fields[mbti.toLowerCase() as keyof typeof data.recommend_fields]}
			<div
				class="mt-6 flex flex-col items-center justify-center gap-4 text-center sm:gap-5"
				transition:fade
			>
				<p class="text-2xl font-semibold sm:text-3xl">Tipe MBTI mu</p>
				<p class="text-3xl font-bold sm:text-4xl">{mbti.toUpperCase()}</p>
				<p class="px-4 text-lg font-medium italic sm:text-xl">
					"Bidang yang cocok pada tipe {mbti.toUpperCase()} yaitu, {data.recommend_fields[
						mbti.toLowerCase() as keyof typeof data.recommend_fields
					]}"
				</p>
			</div>
		{:else if hasSubmitted && !data.recommend_fields[mbti.toLowerCase() as keyof typeof data.recommend_fields]}
			<div
				class="mt-6 flex flex-col items-center justify-center gap-4 text-center sm:gap-5"
				transition:fade
			>
				<p class="text-2xl font-semibold sm:text-3xl">Salah masukkan tipe nih!</p>
				<p class="px-4 text-lg font-medium italic sm:text-xl">Coba tambahkan tipe yang benar ya!</p>
			</div>
		{/if}
	</div>
</div>
