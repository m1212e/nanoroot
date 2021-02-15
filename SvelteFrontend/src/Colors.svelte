<script lang="ts">
  import ColorRect from "./ColorRect.svelte";

  var colors = ['#25BE30', '#072497', '#C5F637', '#EEF1EE', '#366B39', 
                '#D089C2', '#BD231B', '#53BBD3', '#E30DEF', '#4B1BAA',
                '#E2FE47', '#E2FE47', '#0DB3A2', '#E77311', '#7aff6e',
                '#784f19', '#341fcf']
</script>

<h2>Farben</h2>
<div class="row colorContainer">
  {#each colors as color}
    <ColorRect color={color} />
  {/each}
</div>

<style>
  .colorContainer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>