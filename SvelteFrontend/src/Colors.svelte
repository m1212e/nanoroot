<script lang="ts">
import AddColor from "./AddColor.svelte";

  import ColorRect from "./ColorRect.svelte";

  export var colors = undefined;
</script>

<h2>Farben</h2>
<div class="row colorContainer">
  {#each colors as color, k}
    <ColorRect color={color} index={k} />
  {/each}
  <AddColor currentSize={colors.length-1}/>
</div>

<style>
  .colorContainer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>