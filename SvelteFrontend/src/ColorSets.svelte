<script>
  import ColorRect from "./ColorRect.svelte";

  var sets = [
    ['#25BE30', '#072497', '#C5F637'],
    ['#EEF1EE', '#366B39', '#D089C2'],
    ['#E2FE47', '#0DB3A2', '#E77311', '#341fcf', '#341fcf'],
  ];

</script>

<div>
  <h2>Farbsets</h2>
  <div class="setContainer">
    {#each sets as set}
      <div class="row colorSet">
        {#each set as color}
          <ColorRect color={color} />
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
    margin-left: .5rem;
    margin-right: .5rem;
    border: 2px white solid;
    border-radius: 25px;
    margin-bottom: 1rem;
  }
</style>