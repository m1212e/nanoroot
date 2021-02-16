<script lang="ts">
  import ColorRect from "./ColorRect.svelte";

  export var colors = undefined;
</script>

<h2>Farben</h2>
<div class="row colorContainer">
  {#each colors as color, k}
    <ColorRect color={color} index={k} />
  {/each}
  <!-- <AddColor /> -->
</div>

<style>
  .colorContainer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>