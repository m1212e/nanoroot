<script lang="ts">
import { current_component } from "svelte/internal";

  import AddColor from "./AddColor.svelte";

  import ColorRect from "./ColorRect.svelte";
  import {
    sendCurrentSelectedIndex,
    sendRemoveSimpleColor,
    sendSimpleColorsSelected,
    state,
  } from "./sockets";

  var deleteModeOn = false;

</script>

<h2 on:click={() => {
    deleteModeOn = !deleteModeOn; 
    console.log('deleteModeOn: ', deleteModeOn);
  }}
>Farben</h2>
<div class="row colorContainer">
  {#each $state.simpleColors as color, k}
    <ColorRect
      on:dblclick={(() => console.log('delete'))}
      on:clicked={() => {
        if(!deleteModeOn){
          sendSimpleColorsSelected({ simpleColorsSelected: true });
          sendCurrentSelectedIndex({ index: k });
        }else{
          if($state.simpleColors.length > 1){
            sendRemoveSimpleColor({ index: k });
          }
        }
      }}
      {color}
      selected={$state.simpleColorsSelected && $state.index == k}
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
