<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div
  class="row colorSet justify-content-center"
  on:click|stopPropagation
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
    margin: 0.6rem;
    cursor: pointer;
  }
  .add {
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
  }
</style>
