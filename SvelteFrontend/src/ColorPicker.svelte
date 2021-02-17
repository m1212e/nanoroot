<script>
  import iro from '@jaames/iro';
  import { onMount } from 'svelte';
import { sendChangeSimpleColor, state } from './sockets';

  export var initColor = undefined;
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
        sendChangeSimpleColor({color: color.hexString})
      }
    });
  });

  window.onresize = () => {
    colorPicker.resize(handleSize());
  }

  function changeColorByHex(){
    let hex = [...document.getElementById('hexColorInput').value].filter((e) => e !== '#').join('');
    if(hex.length === 6){
      colorPicker.color.hexString = '#' + hex;
    }
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
  <div id="picker" ></div>
  <input on:input={changeColorByHex} id="hexColorInput" type="text" class="form-control hexintput">
</div>


<style>
  .hexintput {
    width: 150px;
    margin-top: 2rem;
    margin-left: 1rem;
  }
</style>