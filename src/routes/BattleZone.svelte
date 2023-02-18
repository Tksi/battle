<script lang="ts">
  import Card from './Card.svelte';
  export let battleCardArr = [-1, -1];
  $: console.log(battleCardArr);
</script>

<div>
  <Card number={battleCardArr[0]} />

  {#each battleCardArr.slice(1) as battleCard}
    <span>VS</span>
    <Card number={battleCard} />
  {/each}
</div>
