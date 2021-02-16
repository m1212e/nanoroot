<script>
  export var color = undefined;
  export var index = undefined;

  function setActive(){
    // TODO: aktivstatus an den server senden
    console.log('selected: ', index);
  }

</script>

<div on:click={setActive} id="colorRect{index}" style="--color: {color}" class="color">

</div>

<style>
  .color {
    width: 50px;
    height: 50px;
    background-color: var(--color);
    border-radius: 25%;
    margin: .6rem;
  }
</style>