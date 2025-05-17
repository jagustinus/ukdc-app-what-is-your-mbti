<script lang="ts">
  import { page } from '$app/stores';
  import logo from '$lib/images/logo.png';
</script>

<nav class="flex h-16 items-center justify-start gap-3 bg-gray-600 text-zinc-100 shadow-xl">
  <a href="/" class="flex h-full items-center border-b-2 px-4 border-transparent">
    <img src={logo} alt="Logo" class="h-12 w-23" />
  </a>
  <a
    href="/recommend-fields"
    class="flex h-full items-center border-b-2 px-4 {$page.url.pathname === '/recommend-fields'
			? 'border-orange-700 hover:border-b-orange-700'
			: 'border-transparent hover:border-b-gray-900'} "
  >
    Recommend Fields</a
  >
  <a
    href="/personality-test"
    class="flex h-full items-center border-b-2 px-4 {$page.url.pathname === '/personality-test'
			? 'border-orange-700 hover:border-b-orange-700'
			: 'border-transparent hover:border-b-gray-900'} ">Personality Test</a
  >
  <a
    href="/custom-test"
    class="flex h-full items-center border-b-2 px-4 {$page.url.pathname === '/custom-test'
			? 'border-orange-700 hover:border-b-orange-700'
			: 'border-transparent hover:border-b-gray-900'} ">Custom Test</a
  >
</nav>
