<script lang="ts">
  import Card from './Card.svelte';
</script>

{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as i}
  <Card number={i} />
{/each}
