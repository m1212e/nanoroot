<script lang="ts">
import { current_component } from "svelte/internal";

  import AddSimpleColor from "./AddSimpleColor.svelte";

  import ColorRect from "./ColorRect.svelte";
  import {
    sendCurrentSelectedIndex,
    sendRemoveSimpleColor,
    sendSimpleColorsSelected,
    state,
  } from "./sockets";

  export var deleteModeOn: boolean = false;

</script>

<h2>Farben</h2>
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
  <AddSimpleColor />
</div>

<style>
  .colorContainer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>
