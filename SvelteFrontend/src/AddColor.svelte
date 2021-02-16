<script>
  export var currentSize = undefined;

  function add(){
    // TODO: server mitteilen, dass neue Farbe hinzugefügt werden soll
    console.log('added: ', currentSize, ' - ', currentSize+1);
    // TODO: aktuell ausgewählte Farbe auf currentSize+1 setzt, damit diese direkt ausgewählt wird
  }

</script>

<div on:click={add} id="addColorRect" class="color">
  <span class="add"> + </span>
</div>

<style>
  .color {
    width: 50px;
    height: 50px;
    border: solid 3px white;
    border-radius: 25%;
    margin: .6rem;
  }
  .add{
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
  }
</style>