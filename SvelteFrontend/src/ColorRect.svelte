<script>
  export var color = undefined;
  export let selected = false;
</script>

<div
  on:click|stopPropagation
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
    box-shadow: 5px 5px 12px 3px rgba(0, 0, 0, 0.5);
    transition: 0.3s;
  }
</style>
