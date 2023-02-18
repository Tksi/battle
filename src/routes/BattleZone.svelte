<script lang="ts">
  import Card from './Card.svelte';
  export let battleCardArr = [-1, -1];
</script>

<div>
  <Card number={battleCardArr[0]} />
  <span>VS</span>
  <Card number={battleCardArr[1]} />
</div>
