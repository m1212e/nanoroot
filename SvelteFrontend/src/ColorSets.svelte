<script>
  import ColorRect from "./ColorRect.svelte";
  import {
    sendCurrentSelectedIndex,
    sendSimpleColorsSelected,
    state,
  } from "./sockets";
</script>

<div>
  <h2>Farbsets</h2>
  <div class="setContainer">
    {#each $state.presetColors as set, k}
      <div
        class="row colorSet {!$state.simpleColorsSelected && $state.index == k ? 'selected' : ''}"
        on:click={() => {
          sendCurrentSelectedIndex({ index: k });
          sendSimpleColorsSelected({ simpleColorsSelected: false });
        }}
      >
        {#each set as color}
          <ColorRect {color} />
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .setContainer {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .colorSet {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border: 2px white solid;
    border-radius: 25px;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .selected {
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.5);
    transition: 0.3s;
  }
</style>
