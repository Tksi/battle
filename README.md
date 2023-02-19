## Rule

1. Select card to battle
2. If your card is greater than or equal to opponent's, get 1point

## Usage

### Server

```bash
cd boardgame-ws-server
npm i
npm run start
```

use `PORT` env to set port (default is 4567)

### Front

```bash
cd frontend
npm i
npm run dev
```

use `PUBLIC_WS` env to set websocket host (default is ws://localhost:4567)
