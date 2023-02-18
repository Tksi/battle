import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { GameId, GameState, ReqMessage, ResMessage, UserId } from '$types';
import { browser } from '$app/environment';
import { PUBLIC_WS } from '$env/static/public';
import { replacer, reviver } from '$lib/jsonMap';

type StatePublic = { [key: string]: unknown };

type StateUser = { cardArr: number[]; battleCard: number };

export const myUserId = writable<UserId>();

export const gameState = writable<GameState<StatePublic, StateUser>>({});

let ws: WebSocket;
let gameId: GameId;
gameState.subscribe((state) => {
  if (ws && state.publicState.turnUserId !== null) {
    ws.send(
      JSON.stringify(
        {
          type: 'SEND',
          gameId,
          gameState: state,
        },
        replacer
      )
    );
  }
});

if (browser) {
  ws = new WebSocket(PUBLIC_WS ?? 'ws://localhost:4567');
  let userName = localStorage.getItem('userName')!;

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
          myUserId.set(message.body);

          break;
        }

        case 'GAMESTATE': {
          gameState.set(message.body);

          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  });
}
