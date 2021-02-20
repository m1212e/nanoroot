<script>
    export var deleteModeOn = false;
    export var toDelete = undefined;
  
  </script>
  
  <div on:click|stopPropagation class="color d-flex justify-content-center align-items-center">
    {#if deleteModeOn}
      <i class="fas fa-trash"></i>
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

  </style>
