<script>
import { sendAddSimpleColor } from "./sockets";


  function add(){
    sendAddSimpleColor({color: '#FFFFFF'})
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
    cursor: pointer;
  }
  .add{
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
  }
</style>