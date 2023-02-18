<script lang="ts">
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import BattleZone from './BattleZone.svelte';
  import Card from './Card.svelte';
  import type {
    GameId,
    GameState,
    ReqMessage,
    ResMessage,
    UserId,
  } from '$types';
  import { PUBLIC_WS } from '$env/static/public';
  import { replacer, reviver } from '$lib/jsonMap';

  let cardArr = [1, 2, 3, 4, 5];
  let clickable = true;
  let battleCardArr = [-1, -1, -1];
  $: console.log(cardArr);

  type StatePublic = { [key: string]: unknown };

  type StateUser = { cardArr: number[] };

  let ws: WebSocket;
  let userName = '';
  let myUserId: UserId;
  let gameState: GameState<StatePublic, StateUser> = {};
  onMount(() => {
    ws = new WebSocket(PUBLIC_WS ?? 'ws://localhost:4567');
    userName = localStorage.getItem('userName')!;

    const gameId = new URL(location.href).searchParams.get('gameId') as GameId;
    const setGameId = () =>
      (location.href = `${location.origin}?${new URLSearchParams([
        ['gameId', `GAME-${uuidv4()}`],
      ]).toString()}`);

    if (gameId === null) {
      setGameId();
    }

    ws.addEventListener('open', () => {
      while (!userName) {
        userName = prompt('name?')!;
      }

      localStorage.setItem('userName', userName);
      const joinMessage: ReqMessage<StatePublic, StateUser> = {
        type: 'JOIN',
        gameId,
        userName,
      };
      ws.send(JSON.stringify(joinMessage));
    });

    ws.addEventListener('message', ({ data: JSONmessage }) => {
      try {
        const message = JSON.parse(JSONmessage, reviver) as ResMessage<
          StatePublic,
          StateUser
        >;
        console.log(message);

        switch (message.type) {
          case 'USERID': {
            myUserId = message.body;

            break;
          }

          case 'GAMESTATE': {
            gameState = message.body;

            break;
          }
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
</script>

<div class="container">
  <BattleZone {battleCardArr} />

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
