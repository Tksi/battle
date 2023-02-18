<script lang="ts">
  import Card from './Card.svelte';
  import BattleZone from './BattleZone.svelte';
  let cardArr = [1, 2, 3, 4, 5, 6];
  let battleCardArr = [-1, -1];
  $: console.log(cardArr);
</script>

<BattleZone {battleCardArr} />

{#each cardArr as number, index}
  <Card
    {number}
    on:click={() => {
      battleCardArr[0] = cardArr.splice(index, 1)[0];
      cardArr = cardArr;
    }}
  />
{/each}
