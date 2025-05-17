<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';

  let { children } = $props();
</script>

<div class="min-h-screen bg-zinc-800">
  <header class="sticky top-0 right-0 w-full">
    <Navbar />
  </header>

  <div class="content text-zinc-100">
    {@render children()}
  </div>
</div>
