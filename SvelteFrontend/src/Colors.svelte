<script lang="ts">
  import AddColor from "./AddColor.svelte";

  import ColorRect from "./ColorRect.svelte";
  import {
    sendCurrentSelectedIndex,
    sendSimpleColorsSelected,
    state,
  } from "./sockets";

  export var colors = undefined;
</script>

<h2>Farben</h2>
<div class="row colorContainer">
  {#each colors as color, k}
    <ColorRect
      on:clicked={() => {
        sendSimpleColorsSelected({ simpleColorsSelected: true });
        sendCurrentSelectedIndex({ index: k });
      }}
      {color}
      selected={$state.index == k}
    />
  {/each}
  <AddColor />
</div>

<style>
  .colorContainer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>
