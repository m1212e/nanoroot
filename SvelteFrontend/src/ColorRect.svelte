<script>
  export var color;
</script>

<div style="--color: {color}" class="color">

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