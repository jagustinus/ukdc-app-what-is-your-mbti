<script lang="ts">
	import logo from '$lib/images/mbti.png';
	import { ArrowUpRight } from '@lucide/svelte';
	import { goto } from '$app/navigation';

	const content = [
		{
			title: 'Rekomendasi Bidang',
			description:
				'Cari tahu bidang pada lingkup informatika yang cocok untukmu berdasarkan kepribadianmu!',
			url: '/recommend-fields'
		},
		{
			title: 'Tes Kepribadian',
			description:
				'Cari tahu tipe kepribadian kamu biar makin kenal diri sendiri dan tahu cara kamu ngadepin dunia!',
			url: '/personality-test'
		},
		{
			title: 'Tes Kustom',
			description:
				'Mau tes yang sesuai kebutuhan kamu? Bikin sendiri, sesuaikan, dan explore dirimu sepuasnya.',
			url: '/custom-test'
		}
	];

	async function navigateTo(url: string) {
		await goto(url);
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center bg-zinc-100 text-zinc-800">
	<div class="max-w-3/4 md:max-w-xl">
		<img src={logo} alt="logo" />
	</div>
	<p class="m-2 mt-4 text-center text-4xl font-bold">Mulai Tes Sekarang</p>
	<p class="m-2 mt-6 text-center text-xl font-medium">
		Cari tahu tipe kepribadianmu dan pahami cara berpikir serta berinteraksi yang paling alami
		untukmu.
	</p>
	<div
		class="mt-8 flex w-full max-w-7xl items-center justify-between gap-10 px-2 max-md:flex-col-reverse max-md:gap-2"
	>
		{#each content as item, index (index)}
			<button
				onclick={() => navigateTo(item.url)}
				class="flex w-1/3 cursor-pointer flex-col gap-3 rounded-md border-2 border-gray-600 p-6 text-left transition-all duration-500 ease-in-out hover:border-orange-600 focus:border-orange-600 focus:ring-2 focus:ring-orange-300 focus:outline-none max-md:w-full"
			>
				<p class="text-xl font-bold">{item.title}</p>
				<p class="text-base">{item.description}</p>
				<div class="flex items-center gap-1">
					<span class="font-medium text-orange-600">Lihat Detail</span>
					<ArrowUpRight class="h-4 w-4 text-orange-600" />
				</div>
			</button>
		{/each}
	</div>
</div>
