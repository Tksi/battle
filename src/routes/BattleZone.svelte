<script lang="ts">
  import Card from './Card.svelte';

  export let battleCardArr = [-1, -1];
  $: console.log(battleCardArr);
</script>

<div class="container">
  <span class="battleCardContainer">
    <Card number={battleCardArr[0]} />
    <div>Tksi(0)</div>
  </span>

  {#each battleCardArr.slice(1) as battleCard}
    <span class="vs">vs</span>
    <span class="battleCardContainer">
      <Card number={battleCard} />
      <div>Tksi(0)</div>
    </span>
  {/each}
</div>

<style>
  .container {
    font-size: min(5vw, 1.5rem);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .battleCardContainer {
    border: 5px dashed transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .vs {
    /* font-style: italic; */
    margin: 0 2px;
  }
</style>
