import { get, writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { GameId, GameState, ReqMessage, ResMessage, UserId } from '$types';
import { browser } from '$app/environment';
import { PUBLIC_WS } from '$env/static/public';
import { replacer, reviver } from '$lib/jsonMap';

type StatePublic = { [key: string]: unknown };

export type StateUser = {
  cardArr: number[];
  battleCard: number;
  score: number;
  clickable: boolean;
};

export const myUserId = writable<UserId>();

export const gameStateW = writable<GameState<StatePublic, StateUser>>({});

export const gameStateR = writable<GameState<StatePublic, StateUser>>({});

let ws: WebSocket;
let gameId: GameId;
gameStateW.subscribe((state) => {
  gameStateR.set(get(gameStateW));

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

  gameId = new URL(location.href).searchParams.get('gameId') as GameId;
  const setGameId = () =>
    (location.href = `${location.origin}?${new URLSearchParams([
      ['gameId', `GAME-${uuidv4()}`],
    ]).toString()}`);

  if (gameId === null) {
    setGameId();
  }

  let userName = localStorage.getItem('userName')!;
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

  ws.addEventListener('message', ({ data: JSONmessage }: { data: string }) => {
    try {
      const message = JSON.parse(JSONmessage, reviver) as ResMessage<
        StatePublic,
        StateUser
      >;
      console.debug(message);

      switch (message.type) {
        case 'USERID': {
          myUserId.set(message.body);

          break;
        }

        case 'GAMESTATE': {
          gameStateR.set(message.body);

          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  });

  ws.addEventListener('close', () => {
    location.reload();
  });
}
