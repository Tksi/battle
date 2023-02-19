<script lang="ts">
  import BattleZone from './BattleZone.svelte';
  import Card from './Card.svelte';
  import { gameStateR, gameStateW, myUserId, setGameId } from '$/store';

  $: myUserState = $gameStateR.userStates?.get($myUserId);
</script>

<svelte:head>
  <title>Battle</title>
  <meta name="robots" content="noindex nofollow" />
</svelte:head>

{#if ($gameStateR.publicState?.turnUserId ?? null) === null}
  <div class="message">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    share URL or make <span class="room" on:click={setGameId}> new Room</span>
  </div>
{/if}

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
  .message {
    position: fixed;
    top: 0;
    background-color: white;
    width: 100dvw;
    text-align: center;
  }
  .room {
    user-select: none;
    text-decoration: underline;
    color: blue;
  }
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
