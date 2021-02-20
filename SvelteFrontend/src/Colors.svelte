<script lang="ts">

  import AddSimpleColor from "./AddSimpleColor.svelte";

  import ColorRect from "./ColorRect.svelte";
  import {
    state,
  } from "./sockets";

  export var deleteModeOn: boolean = false;

</script>

<h2>Farben</h2>
<div class="row colorContainer">
  {#each $state.simpleColors as color, k}
    <ColorRect
      on:dblclick={(() => console.log('delete'))}
      on:click={() => {
        if(!deleteModeOn){
          state.update(s => {
            s.simpleColorsSelected = true
            s.index = k
            return s
          })
        }else{
          if($state.simpleColors.length > 1){
            // sendRemoveSimpleColor({ index: k });TODO
          }
        }
      }}
      {color}
      selected={$state.simpleColorsSelected && $state.index == k}
    />
  {/each}
  <AddSimpleColor />
</div>

<style>
  .colorContainer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>
