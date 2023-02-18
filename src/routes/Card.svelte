<script lang="ts">
  export let number: number = 0;

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

<div class="card">
  <span class="number" style="--shadowColor:{shadowColorMap.get(number)}"
    >{number}</span
  >
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

  .card {
    user-select: none;
    width: 100px;
    height: 100px;
    background-color: rgb(245, 243, 237);
    border-radius: 20%;
    display: inline-grid;
    place-items: center;
    font-size: 5rem;
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
</style>
