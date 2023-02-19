<script lang="ts">
  import Card from './Card.svelte';
  import type { StateUser } from '$/store';
  import type { UserId, UserState } from '$types';
  import { gameStateR, gameStateW, myUserId } from '$/store';

  $: userStateArr = $gameStateR.userStates
    ? [...$gameStateR.userStates?.entries()]
    : [];

  const startGame = () => {
    const cardLen = 5;
    // ターンベースではないのでnull以外ならなんでもよい
    $gameStateR.publicState.turnUserId = $myUserId;

    // 初期化
    for (const [, userState] of $gameStateR.userStates) {
      userState.score = 0;
      userState.clickable = true;
      userState.battleCard = -1;
      userState.cardArr = new Array(cardLen)
        .fill('')
        .map(() => Math.trunc(Math.random() * (cardLen + 1)));
    }

    $gameStateW = $gameStateR;
  };

  $: showCard = (userId: UserId, userState: UserState<StateUser>): number => {
    if (
      userId === $myUserId ||
      userStateArr.every(([, userState]) => userState.clickable === false)
    ) {
      return userState?.battleCard ?? -1;
    }

    return -1;
  };

  $: isWinner = (userState: UserState<StateUser>): boolean => {
    if ((userState?.battleCard ?? -1) === -1) return false;

    if (userStateArr.every(([, userState]) => userState.clickable === false)) {
      return (
        userState.battleCard ===
        userStateArr
          .map(([, userState]) => userState.battleCard)
          .reduce((a, b) => Math.max(a, b))
      );
    }

    return false;
  };
</script>

<div class="container">
  <span
    class="battleCardContainer"
    class:winner={isWinner(userStateArr[0]?.[1])}
  >
    <Card number={showCard(userStateArr[0]?.[0], userStateArr[0]?.[1])} />
    <div>
      {userStateArr[0]?.[1].userName ?? ''}
      {userStateArr[0]?.[1].score ?? ''}
    </div>
  </span>

  {#each userStateArr.slice(1) as [userId, userState]}
    <span class="vs">vs</span>
    <span class="battleCardContainer" class:winner={isWinner(userState)}>
      <Card number={showCard(userId, userState)} />
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

  .winner {
    border: 5px dashed rgb(50, 228, 178);
  }

  .vs {
    margin: 0 2px;
  }
</style>
