<script lang="ts">
  import Card from './Card.svelte';
  import { gameStateR, gameStateW, myUserId } from '$/store';

  $: userStateArr = $gameStateR.userStates
    ? [...$gameStateR.userStates?.values()]
    : [];

  const cardLen = 5;
  // 初期化
  const startGame = () => {
    const tmpGameState = structuredClone($gameStateR);
    tmpGameState.publicState.turnUserId = $myUserId;
    for (const [, userState] of tmpGameState.userStates) {
      userState.score = 0;
      userState.battleCard = -1;
      userState.cardArr = new Array(cardLen)
        .fill('')
        .map(() => Math.trunc(Math.random() * (cardLen + 1)));
    }
    $gameStateW = tmpGameState;
  };
</script>

<div class="container">
  <span class="battleCardContainer">
    <Card number={userStateArr[0]?.battleCard ?? -1} />
    <div>
      {userStateArr[0]?.userName ?? ''}
      {userStateArr[0]?.score ?? ''}
    </div>
  </span>

  {#each userStateArr.slice(1) as userState}
    <span class="vs">vs</span>
    <span class="battleCardContainer">
      <Card number={userState.battleCard ?? -1} />
      <div>{userState.userName} {userState.score ?? ''}</div>
    </span>
  {/each}

  {#if $gameStateR.publicState?.turnUserId === null && $gameStateR.userStates.size >= 2}
    <button on:click={startGame}>Start</button>
  {/if}
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
    margin: 0 2px;
  }
</style>
