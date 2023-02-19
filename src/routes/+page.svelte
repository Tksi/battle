<script lang="ts">
  import BattleZone from './BattleZone.svelte';
  import Card from './Card.svelte';
  import { gameStateR, gameStateW, myUserId } from '$/store';

  $: myUserState = $gameStateR.userStates?.get($myUserId);
</script>

<svelte:head>
  <title>Battle</title>
  <meta name="robots" content="noindex nofollow" />
</svelte:head>

<div class="container">
  <BattleZone />
  <div class="cardContainer">
    {#each myUserState?.cardArr ?? [] as number, index}
      <Card
        {number}
        clickable={myUserState?.clickable}
        on:click={() => {
          if (myUserState?.clickable) {
            myUserState.battleCard = myUserState.cardArr.splice(index, 1)[0];
            myUserState.clickable = false;
            $gameStateW = $gameStateR;
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
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 20px 0;
    border-radius: 20px;
    width: 100vw;
    max-width: 700px;
    min-height: 315px;
    box-shadow: -100px -100px 0 rgb(61, 61, 61), 100px 100px 0 rgb(61, 61, 61);
  }
</style>
