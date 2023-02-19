<script lang="ts">
  import BattleZone from './BattleZone.svelte';
  import Card from './Card.svelte';
  import { gameStateR, gameStateW, myUserId } from '$/store';

  $: console.log($gameStateR);

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
    background-color: white;
    padding: 20px 0;
    border-radius: 20px;
    width: 100vw;
    max-width: 700px;
  }
</style>
