<script>
  import { sendAddPresetColor } from "./sockets";
  
  
    function add(){
      sendAddPresetColor({color: '#ffffff'});
    }
  
  </script>
  
  <div on:click={add} class="color">
    <span class="add"> + </span>
  </div>
  
  <style>
    .color {
      width: 50px;
      height: 50px;
      border: solid 3px white;
      border-radius: 25%;
      margin: .6rem;
      cursor: pointer;
    }
    .add{
      color: white;
      font-size: 1.6rem;
      font-weight: bold;
    }
  </style>