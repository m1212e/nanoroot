<script lang="ts">
  import AddSet from "./AddSet.svelte";
  import AddSetColor from "./AddSetColor.svelte";
  import ColorRect from "./ColorRect.svelte";
  import {
    sendChangePresetColorsIndex,
    sendCurrentSelectedIndex,
    sendSimpleColorsSelected,
    state,
  } from "./sockets";

  export var deleteModeOn: boolean = false;
</script>

<div>
  <h2>Farbsets</h2>
  <div class="setContainer">
    {#each $state.presetColors as set, k}
      <div
        class="row colorSet {!$state.simpleColorsSelected && $state.index == k ? 'selected' : ''}"
        on:click={() => {
          sendCurrentSelectedIndex({ index: k });
          sendSimpleColorsSelected({ simpleColorsSelected: false });
        }}
      >
        {#each set as color, i}
          <ColorRect {color} on:clicked={() =>{
            if(deleteModeOn){
              // TODO: Löschen für einzelne Farbe im Farbset
              console.log('Löschen für einzelne Farbe im Farbset');
            }else{
              sendChangePresetColorsIndex({index: i})
            }
          }}
          selected={!$state.simpleColorsSelected && $state.index == k && $state.presetColorsIndex == i}/>
        {/each}
        <AddSetColor toDelete={k} {deleteModeOn}  />
      </div>
    {/each}
    <AddSet />
  </div>
</div>

<style>
  .setContainer {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .colorSet {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border: 2px white solid;
    border-radius: 25px;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .selected {
    box-shadow:  5px 5px 12px 3px rgba(0, 0, 0, .5);
    transition: 0.3s;
  }
</style>
