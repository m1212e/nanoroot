<script lang="">

	var showModal = false;
	// var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
	// 	keyboard: false
	// })

	function power() {
		// TODO: ausschalten an den server senden 
		console.log('power function: ', showModal);
	}
	function timer(){
		// TODO: timerwert an den server senden
		console.log('timer');
	}
</script>

<div class="row d-flex justify-content-between buttons">
  <button on:click={power} type="button" id="powerButton" class="col-md btn btn-danger button">Ein/Aus</button>
  <button on:click={() => showModal = true} type="button" id="timerButton" class="col-md btn btn-primary button">Timer</button>

	{#if showModal}
		<!-- <div id="myModal" class="modal" tabindex="-1"> -->
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Modal title</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<p>Modal body text goes here.</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		<!-- </div> -->
	{/if}

</div>

<style>
  .buttons {
		height: 10%;
	}
	.button {
		width: 40%;
		height: 50%;
		margin-left: 2rem;
		margin-right: 2rem;
		margin-top: auto;
		margin-bottom: auto;
	}
</style>