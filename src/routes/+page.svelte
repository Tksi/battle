<script lang="ts">
  import BattleZone from './BattleZone.svelte';
  import Card from './Card.svelte';
  import { gameState } from '$/store';

  let cardArr = [1, 2, 3, 4, 5];
  let clickable = true;
  let battleCardArr = [-1, -1, -1];
  $: console.log($gameState);
</script>

<div class="container">
  <BattleZone />

  <div class="cardContainer">
    {#each cardArr as number, index}
      <Card
        {number}
        {clickable}
        on:click={() => {
          if (clickable) {
            battleCardArr[0] = cardArr.splice(index, 1)[0];
            cardArr = cardArr;
            clickable = false;
          }
        }}
      />
    {/each}
  </div>
</div>

<style>
  .cardContainer {
    display: flex;
    justify-content: center;
  }

  .container {
    background-color: white;
    padding: 20px 0;
    border-radius: 20px;
    width: 100vw;
    max-width: 700px;
  }
</style>
