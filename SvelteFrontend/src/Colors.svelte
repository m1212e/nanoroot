<script lang="ts">

  import AddSimpleColor from "./AddSimpleColor.svelte";

  import ColorRect from "./ColorRect.svelte";
  import {
    state,
  } from "./sockets";

  export let deleteModeOn: boolean = false;

</script>

<h2>Farben</h2>
<div class="row colorContainer">
  {#each $state.simpleColors as color, k}
    <ColorRect
      on:click={() => {
        if(!deleteModeOn){
          state.update(current => {
            current.simpleColorsSelected = true
            current.index = k
            return current
          })
        }else{
          state.update(current => {
            if(current.simpleColors.length > 1){
              current.simpleColorsSelected = true
              current.simpleColors.splice(k, 1)
              current.index = 0
            }
            return current
          })
        }
      }}
      {color}
      selected={$state.simpleColorsSelected && $state.index == k}
    />
  {/each}
  <AddSimpleColor on:click={() => {
    state.update(current => {
      current.simpleColors.push('#ffffff')
      current.index = current.simpleColors.length - 1
      return current
    })
  }} />
</div>

<style>
  .colorContainer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>
