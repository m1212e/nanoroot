<script>
  import ColorRect from "./ColorRect.svelte";

  export var colorSets = undefined;

</script>

<div>
  <h2>Farbsets</h2>
  <div class="setContainer">
    {#each colorSets as set}
      <div class="row colorSet">
        {#each set as color}
          <ColorRect color={color} />
        {/each}
        <!-- <AddColor /> -->
      </div>
    {/each}
    <!-- <AddSet /> -->
  </div>
</div>

<style>
  .setContainer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .colorSet {
    margin-left: .5rem;
    margin-right: .5rem;
    border: 2px white solid;
    border-radius: 25px;
    margin-bottom: 1rem;
    cursor: pointer;
  }
</style>