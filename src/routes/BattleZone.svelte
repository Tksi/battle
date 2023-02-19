<script lang="ts">
  import Card from './Card.svelte';
  import type { StateUser } from '$/store';
  import type { GameId, UserId, UserState, UserStates } from '$types';
  import { gameStateR, gameStateW, myUserId } from '$/store';

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

  $: userStateArr = $gameStateR.userStates
    ? [...$gameStateR.userStates?.entries()]
    : [];

  $: showCard = (userId: UserId, userState: UserState<StateUser>): number => {
    if (userId === $myUserId || isAllBattleCardAppeared()) {
      return userState?.battleCard ?? -1;
    }

    return -1;
  };

  $: isAllBattleCardAppeared = (
    arr: [UserId, UserState<StateUser>][] = userStateArr
  ): boolean => {
    return arr.every(([, userState]) => userState.clickable === false);
  };

  $: isGameEnd = (
    arr: [UserId, UserState<StateUser>][] = userStateArr
  ): boolean => {
    return arr.every(([, userState]) => userState.cardArr.length === 0);
  };

  $: isWinner = (userState: UserState<StateUser>): boolean => {
    if ((userState?.battleCard ?? -1) === -1) return false;

    if (isAllBattleCardAppeared()) {
      return (
        userState.battleCard ===
        userStateArr
          .map(([, userState]) => userState.battleCard)
          .reduce((a, b) => Math.max(a, b))
      );
    }

    return false;
  };

  $: if (isAllBattleCardAppeared()) {
    const isFirstUser = userStateArr[0]?.[0] === $myUserId;
    // 点数の加算処理(先頭の人)
    if (isFirstUser && userStateArr.length > 0) {
      const maxNumber = userStateArr
        .map(([, userState]) => userState.battleCard)
        .reduce((a, b) => Math.max(a, b));
      for (const [, userState] of userStateArr) {
        if (userState.battleCard === maxNumber) {
          userState.score++;
        }
      }

      $gameStateW = $gameStateR;
      // 次ターン
      if (!isGameEnd()) {
        setTimeout(() => {
          for (const [, userState] of userStateArr) {
            userState.battleCard = -1;
            userState.clickable = true;
          }

          $gameStateW = $gameStateR;
        }, 2000);
      }
    }
  }
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

  {#if ($gameStateR.publicState?.turnUserId === null || isGameEnd()) && $gameStateR.userStates?.size >= 2}
    <button on:click={startGame}>Start</button>
  {/if}
</div>

<style>
  .container {
    font-size: min(5vw, 1.5rem);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
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
