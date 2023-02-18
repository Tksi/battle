<script lang="ts">
  export let number = -1;
  const shadowColorMap = new Map([
    [0, '#ef5350'],
    [1, '#ba68c8'],
    [2, '#42a5f5'],
    [3, '#26a69a'],
    [4, '#66bb6a'],
    [5, '#d4e157'],
    [6, '#ffee58'],
    [7, '#ffa726'],
    [8, '#ff7043'],
    [9, '#ec407a'],
  ]);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card" class:hidden={number === -1} on:click>
  <span class="number" style="--shadowColor:{shadowColorMap.get(number)}"
    >{number}</span
  >
</div>

<style>
  .card {
    user-select: none;
    max-width: 100px;
    max-height: 100px;
    width: 15vw;
    height: 15vw;
    background-color: rgb(245, 243, 237);
    border-radius: 20%;
    display: inline-grid;
    place-items: center;
    font-size: min(10vw, 4rem);
    font-family: 'Dancing Script', cursive;
    box-shadow: 0 1px 3px rgba(128, 128, 128, 0.5);
    margin: 5px;
  }

  .card:hover {
    transform: translateY(-3px);
  }

  .card:hover span {
    text-shadow: 3px 3px 0 var(--shadowColor);
  }

  .hidden > .number {
    visibility: hidden;
  }

  .hidden:hover {
    transform: translateY(0);
  }
</style>
