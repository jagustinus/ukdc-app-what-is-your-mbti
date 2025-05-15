<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen bg-zinc-800">
	<header>
		<Navbar />
	</header>

	<div class="content text-zinc-100">
		{@render children()}
	</div>
</div>
