<script>
  import iro from "@jaames/iro";
  import { onMount } from "svelte";
  import { state } from "./sockets";
  import { sendChangeColor } from "./helpers";

  var initColor = "#FFFFFF";
  var colorPicker = undefined;

  onMount(() => {
    colorPicker = new iro.ColorPicker("#picker", {
      width: handleSize(),
      color: initColor,
    });

    document.getElementById("hexColorInput").value = initColor;

    colorPicker.on("color:change", (color) => {
      document.getElementById("hexColorInput").value = color.hexString;
      sendChangeColor(color.hexString);
    });

    state.subscribe((s) => {
      const currentHex = s.simpleColorsSelected
        ? s.simpleColors[s.index]
        : s.presetColors[s.index][s.presetColorsIndex];
      if (colorPicker.color.hexString != currentHex) {
        colorPicker.color.hexString = currentHex;
      }
    });
  });

  function changeColorByHex(hex) {
    hex = hex.replace("#", "");
    console.log(hex);
    if (hex.length === 6) {
      sendChangeColor("#" + hex);
    }
  }

  window.addEventListener('resize', () => {
    colorPicker.resize(handleSize());
  });

  var handleSize = () => {
    if (window.innerWidth >= 1200) {
      return Math.min(650, window.innerWidth / 3.5);
    } else {
      return 350;
    }
  };
</script>

<div id="box" class="w-50 mx-auto">
  <div id="picker" />
  <input
    on:input={(data) => changeColorByHex(data.target.value)}
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
