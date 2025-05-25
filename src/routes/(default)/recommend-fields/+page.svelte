<script lang="ts">
  import { fade } from 'svelte/transition';
  const { data } = $props();

  let mbti = $state('');
  let hasSubmitted = $state(false);
</script>

<svelte:head>
  <title>Recommend Fields</title>
</svelte:head>

<div class="flex min-h-screen justify-center items-center">
  <div class="flex flex-col items-center text-center">
    <h1 class="text-2xl font-bold mb-4">Welcome to the Recommend Fields Page</h1>
    <p>Input your MBTI type, and see recommended field in Informatics</p>
    <div class="w-2xl flex items-center justify-center">
      <input bind:value={mbti} oninput={() => hasSubmitted = false} type="text" placeholder="Enter your MBTI type"
             class="border-2 p-2 m-4 rounded-sm text-zinc-800 placeholder:text-gray-500 focus-visible:border-gray-500 focus:border-2 border-zinc-700 bg-transparent active:border-gray-500">
      <button onclick={() => hasSubmitted = true }
              class="border-2 border-transparent cursor-pointer font-semibold rounded-sm bg-orange-500 py-2 px-4 active:scale-[0.98] active:transition-all"
      >Send
      </button
      >
    </div>
    {#if hasSubmitted && data.recommend_fields[mbti.toLowerCase() as keyof typeof data.recommend_fields]}
      <div class="flex flex-col items-center justify-center gap-5 text-center" transition:fade>
        <p class="text-3xl font-semibold">Your MBTI result is:</p>
        <p class="text-4xl font-bold">{mbti.toUpperCase()}</p>
        <p class="text-xl font-medium italic">
          "Your fields in {mbti.toUpperCase()} are: {data.recommend_fields[mbti.toLowerCase() as keyof typeof data.recommend_fields]}"
        </p>
      </div>
    {:else if hasSubmitted && !data.recommend_fields[mbti.toLowerCase() as keyof typeof data.recommend_fields]}
      <div class="flex flex-col items-center justify-center gap-5 text-center" transition:fade>
        <p class="text-3xl font-semibold">Invalid MBTI type</p>
        <p class="text-xl font-medium italic">Please enter a valid MBTI type</p>
      </div>
    {/if}
  </div>
</div>