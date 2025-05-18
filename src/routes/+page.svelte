<script lang="ts">
  import logo from '$lib/images/logo.png';
  import { ArrowUpRight } from '@lucide/svelte';

  const content = [
    {
      title: 'Rekomendasi Bidang',
      description: 'Cari tahu bidang pada lingkup informatika yang cocok untukmu berdasarkan kepribadianmu!',
      url: '/recommend-fields'
    },
    {
      title: 'Tes Kepribadian',
      description: 'Cari tahu tipe kepribadian kamu biar makin kenal diri sendiri dan tahu cara kamu ngadepin dunia!',
      url: '/personality-test'
    },
    {
      title: 'Tes Kustom',
      description: 'Mau tes yang sesuai kebutuhan kamu? Bikin sendiri, sesuaikan, dan explore dirimu sepuasnya.',
      url: '/custom-test'
    }
  ];

</script>

<div class="bg-zinc-800 min-h-screen text-white flex flex-col items-center justify-center">
  <div class="max-w-xl">
    <img src={logo} alt="logo">
  </div>
  <p class="text-4xl font-bold mt-4 m-2 text-center">Mulai Tes Sekarang</p>
  <p class="text-xl font-medium mt-6 m-2 text-center">Cari tahu tipe kepribadianmu dan pahami cara berpikir serta
    berinteraksi yang
    paling alami untukmu.</p>
  <div
    class="flex justify-between items-center mt-8 max-w-7xl w-full px-2 gap-10 max-md:flex-col-reverse max-md:gap-2">
    {#each content as item, index (index)}
      <div
        class="flex flex-col gap-3 border-2 border-gray-600 w-1/3 p-6 rounded-md max-md:w-full hover:border-orange-800 transition-all duration-500 ease-in-out cursor-pointer">
        <p class="text-xl font-bold">{item.title}</p>
        <p class="text-base">{item.description}</p>
        <div class="flex">
          <a href={item.url}>Lihat Detail</a>
          <ArrowUpRight />
        </div>
      </div>
    {/each}
  </div>
</div>