<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="flex h-16 items-center justify-start gap-3 bg-gray-600 text-zinc-100 shadow-xl">
	<a
		href="/recommend-fields"
		class="flex h-full items-center border-b-2 px-4 {$page.url.pathname === '/recommend-fields'
			? 'border-orange-500 hover:border-b-orange-500'
			: 'border-transparent hover:border-b-gray-900'} "
	>
		Recommend Fields</a
	>
	<a
		href="/personality-test"
		class="flex h-full items-center border-b-2 px-4 {$page.url.pathname === '/personality-test'
			? 'border-orange-500 hover:border-b-orange-500'
			: 'border-transparent hover:border-b-gray-900'} ">Personality Test</a
	>
</nav>
