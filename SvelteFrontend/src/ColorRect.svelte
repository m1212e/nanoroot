<script>
  export var color = undefined;
  export let selected = false;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div
  on:click={() => dispatch("clicked", { color })}
  style="--color: {color}"
  class="color {selected ? 'selected' : ''}"
/>

<style>
  .color {
    width: 50px;
    height: 50px;
    background-color: var(--color);
    border-radius: 25%;
    margin: 0.6rem;
    cursor: pointer;
  }
  .selected {
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.5);
    transition: .3s;
  }
</style>
