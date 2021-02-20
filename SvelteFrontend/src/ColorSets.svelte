<script lang="ts">
  import AddSet from "./AddSet.svelte";
  import AddSetColor from "./AddSetColor.svelte";
  import ColorRect from "./ColorRect.svelte";
  import { state } from "./sockets";

  export var deleteModeOn: boolean = false;
</script>

<div>
  <h2>Farbsets</h2>
  <div class="setContainer">
    {#each $state.presetColors as set, k}
      <div
        class="row colorSet {!$state.simpleColorsSelected && $state.index == k
          ? 'selected'
          : ''}"
        on:click={() => {
          if ($state.index != k || $state.simpleColorsSelected != false) {
            state.update((s) => {
              s.presetColorsIndex = 0;
              s.index = k;
              s.simpleColorsSelected = false;
              return s;
            });
          }
        }}
      >
        {#each set as color, i}
          <ColorRect
            {color}
            on:click={() => {
              if(deleteModeOn){
                //TODO: implement
              } else {
                state.update((s) => {
                  s.index = k;
                  s.simpleColorsSelected = false;
                  s.presetColorsIndex = i;
                  return s;
                });
              }
            }}
            selected={!$state.simpleColorsSelected &&
              $state.index == k &&
              $state.presetColorsIndex == i}
          />
          {/each}
          <AddSetColor toDelete={k} {deleteModeOn} 
          on:click={() => {
            state.update((s) => {
              s.simpleColorsSelected = false;
              s.index = k;
              s.presetColors[s.index].push("#ffffff");
              s.presetColorsIndex = s.presetColors[s.index].length - 1;
              return s;
            });
          }}
        />
      </div>
    {/each}
    <AddSet
      on:click={() => {
        state.update((s) => {
          s.simpleColorsSelected = false;
          s.presetColors.push(["#ffffff"]);
          s.presetColorsIndex = 0;
          s.index = s.presetColors.length - 1;
          return s;
        });
      }}
    />
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
    box-shadow: 5px 5px 12px 3px rgba(0, 0, 0, 0.5);
    transition: 0.3s;
  }
</style>
