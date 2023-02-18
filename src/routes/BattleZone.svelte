<script lang="ts">
  import Card from './Card.svelte';
  import { gameState } from '$/store';

  $: userStateArr = $gameState.userStates
    ? [...$gameState.userStates?.values()]
    : [];
</script>

<div class="container">
  <span class="battleCardContainer">
    <Card number={userStateArr[0]?.battleCard ?? -1} />
    <div>{userStateArr[0]?.userName ?? ''}</div>
  </span>

  {#each userStateArr.slice(1) as userState}
    <span class="vs">vs</span>
    <span class="battleCardContainer">
      <Card number={userState.battleCard ?? -1} />
      <div>{userState.userName}</div>
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
