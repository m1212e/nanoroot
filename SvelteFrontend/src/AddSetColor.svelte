<script>
  import { null_to_empty } from "svelte/internal";
  import { sendAddPresetColor } from "./sockets";
  
    export var deleteModeOn = false;
    export var toDelete = undefined;
  
    function handleClick(){
      if(deleteModeOn){
        if(toDelete != undefined){
          // TODO: Set aus Colorsets löschen. (toDelete ist der index)
          console.log('Ganzes Farbset Löschen');
        }else{
          console.log('Can not delete undefined');
        }
      }else{
        sendAddPresetColor({color: '#ffffff'});
      }
    }
    
  </script>
  
  <div on:click={handleClick} class="color d-flex justify-content-center align-items-center">
    {#if deleteModeOn}
      <i class="fas fa-trash delete"></i>
    {:else}
      <i class="fas fa-plus add"></i>
    {/if}
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
    i {
      color: white;
      font-size: 1.6rem;
      font-weight: bold;
    }

    .delete {
      color: red;
    }
  </style>