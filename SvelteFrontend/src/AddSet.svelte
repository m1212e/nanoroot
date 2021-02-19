<script>
import AddSetColor from "./AddSetColor.svelte";
import { sendAddPresetColors } from "./sockets";


</script>

<div
  class="row colorSet d-felx justify-content-center"
  on:click={() => {
    sendAddPresetColors({colors: ['#ffffff']})
  }}
>
  <div class="color">
    <span class="add"> + </span>
  </div>
</div>

<style>
  .colorSet {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border: 2px white solid;
    border-radius: 25px;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  .color {
    width: 50px;
    height: 50px;
    border: solid 0px white;
    margin: .6rem;
    cursor: pointer;
  }
  .add{
      color: white;
      font-size: 1.6rem;
      font-weight: bold;
    }
</style>