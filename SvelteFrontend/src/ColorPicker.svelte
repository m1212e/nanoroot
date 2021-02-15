<script>
  import iro from '@jaames/iro';
  import { onMount } from 'svelte';

  var dompicker;
  onMount(() => {
    var colorPicker = new iro.ColorPicker(dompicker, {
      width: 500
    });
  });
</script>

<div class="w-50 mx-auto">
  <div class="" id="picker" bind:this={dompicker}></div>
  <div class="row hexintput justify-content-center align-items-center">
    <input type="text" class="form-control" id='colorcode'>
  </div>
</div>


<style>
  .hexintput {
    width: 150px;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
  }
</style>