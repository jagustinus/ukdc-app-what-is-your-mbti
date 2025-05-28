<script lang="ts">
	import { page } from '$app/stores';

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<nav class="bg-gray-100 text-zinc-800 shadow-xl">
	<!-- Desktop navbar -->
	<div class="hidden h-16 items-center justify-start gap-3 md:flex">
		<a
			href="/"
			class="flex h-full items-center border-b-2 border-transparent px-4 hover:border-b-gray-900"
		>
			Home
		</a>
		<a
			href="/recommend-fields"
			class="flex h-full items-center border-b-2 px-4 {$page.url.pathname === '/recommend-fields'
				? 'border-orange-700 hover:border-b-orange-700'
				: 'border-transparent hover:border-b-gray-900'}"
		>
			Recommend Fields
		</a>
		<a
			href="/personality-test"
			class="flex h-full items-center border-b-2 px-4 {$page.url.pathname === '/personality-test'
				? 'border-orange-700 hover:border-b-orange-700'
				: 'border-transparent hover:border-b-gray-900'}"
		>
			Personality Test
		</a>
		<a
			href="/custom-test"
			class="flex h-full items-center border-b-2 px-4 {$page.url.pathname === '/custom-test'
				? 'border-orange-700 hover:border-b-orange-700'
				: 'border-transparent hover:border-b-gray-900'}"
		>
			Custom Test
		</a>
	</div>

	<!-- Mobile navbar -->
	<div class="md:hidden">
		<!-- Mobile header with hamburger -->
		<div class="flex h-16 items-center justify-between px-4">
			<a href="/" class="text-lg font-semibold">Home</a>
			<button
				on:click={toggleMenu}
				class="rounded-md p-2 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none"
				aria-label="Toggle menu"
			>
				<svg
					class="h-6 w-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					{#if isMenuOpen}
						<!-- X icon when menu is open -->
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					{:else}
						<!-- Hamburger icon when menu is closed -->
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					{/if}
				</svg>
			</button>
		</div>

		<!-- Mobile menu dropdown -->
		{#if isMenuOpen}
			<div class="border-t border-gray-200 bg-gray-50">
				<div class="space-y-1 px-2 pt-2 pb-3">
					<a
						href="/recommend-fields"
						on:click={closeMenu}
						class="block rounded-md px-3 py-2 text-base font-medium {$page.url.pathname ===
						'/recommend-fields'
							? 'border-l-4 border-orange-700 bg-orange-100 text-orange-700'
							: 'text-gray-700 hover:bg-gray-100'}"
					>
						Recommend Fields
					</a>
					<a
						href="/personality-test"
						on:click={closeMenu}
						class="block rounded-md px-3 py-2 text-base font-medium {$page.url.pathname ===
						'/personality-test'
							? 'border-l-4 border-orange-700 bg-orange-100 text-orange-700'
							: 'text-gray-700 hover:bg-gray-100'}"
					>
						Personality Test
					</a>
					<a
						href="/custom-test"
						on:click={closeMenu}
						class="block rounded-md px-3 py-2 text-base font-medium {$page.url.pathname ===
						'/custom-test'
							? 'border-l-4 border-orange-700 bg-orange-100 text-orange-700'
							: 'text-gray-700 hover:bg-gray-100'}"
					>
						Custom Test
					</a>
				</div>
			</div>
		{/if}
	</div>
</nav>
