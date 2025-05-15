<script>
  import { page } from '$app/state';
</script>
<p>Error: {page.status}</p>
<p>Message: {page?.error?.message}</p>