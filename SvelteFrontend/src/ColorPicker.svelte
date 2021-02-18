<script>
  import iro from '@jaames/iro';
  import { onMount } from 'svelte';
  import { getCurrentColorCode, sendChangeColor, state } from './sockets';

  var initColor = getCurrentColorCode();
  var colorPicker = undefined;

  onMount(() => {
    colorPicker = new iro.ColorPicker('#picker', {
      width: handleSize(),
      color: initColor
    });

    document.getElementById('hexColorInput').value = initColor;

    colorPicker.on('color:change', (color) => {
      document.getElementById('hexColorInput').value = color.hexString;
      if($state.simpleColorsSelected){
        sendChangeColor(color.hexString)
      }
    });

    state.subscribe(state => {
      if(colorPicker.color.hexString != getCurrentColorCode()){
        colorPicker.color.hexString = getCurrentColorCode()
      }
    })
  });

  window.onresize = () => {
    colorPicker.resize(handleSize());
  }

  var handleSize = () => {
    if(window.innerWidth >= 1200){
      return Math.min(650, window.innerWidth/3.5);
    }else{
      return 350;
    }
  }
</script>

<div id="box" class="w-50 mx-auto">
  <div id="picker" />
  <input
    on:input={(data) => sendChangeColor(data.target.value)}
    id="hexColorInput"
    type="text"
    class="form-control hexintput"
  />
</div>

<style>
  .hexintput {
    width: 150px;
    margin-top: 2rem;
    margin-left: 1rem;
  }
</style>
