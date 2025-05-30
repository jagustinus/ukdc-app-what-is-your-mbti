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

<div
	class="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4 py-8 text-zinc-800 md:px-8"
>
	<div class="mb-6 max-w-3/4 md:max-w-xl">
		<img src={logo} alt="logo" class="h-auto w-full" />
	</div>
	<p class="mb-4 text-center text-2xl font-bold md:text-4xl">Mulai Tes Sekarang</p>
	<p class="mb-8 max-w-2xl text-center text-base leading-relaxed font-medium md:text-xl">
		Cari tahu tipe kepribadianmu dan pahami cara berpikir serta berinteraksi yang paling alami
		untukmu.
	</p>
	<div
		class="flex w-full max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6"
	>
		{#each content as item, index (index)}
			<button
				onclick={() => navigateTo(item.url)}
				class="flex w-full cursor-pointer flex-col gap-3 rounded-md border-2 border-gray-600 bg-white p-4 text-left shadow-sm transition-all duration-500 ease-in-out hover:border-orange-600 hover:shadow-md focus:border-orange-600 focus:ring-2 focus:ring-orange-300 focus:outline-none md:w-1/3 md:p-6"
			>
				<p class="text-lg font-bold md:text-xl">{item.title}</p>
				<p class="text-sm leading-relaxed md:text-base">{item.description}</p>
				<div class="flex items-center gap-1">
					<span class="font-medium text-orange-600">Lihat Detail</span>
					<ArrowUpRight class="h-4 w-4 text-orange-600" />
				</div>
			</button>
		{/each}
	</div>
</div>
