<script lang="ts">
	import * as io from 'socket.io-client';
import Buttons from './Buttons.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import Colors from './Colors.svelte';
	import ColorSets from './ColorSets.svelte';
	
	io.io().connect()


	export let name: string;
</script>

<main>
	<div class="row d-flex justify-content-around layout align-items-center">
		<div class="col-md-3 glass area">
			<div class="colors">
				<Colors />
				<ColorSets />
			</div>
			<Buttons />
		</div>
		<div class="col-md-8 glass area">
			<div class="row h-100 d-flex align-items-center">
				<div class="col-md-8">
					<ColorPicker />
				</div>
				<div class="col-md-4 h-100 d-flex flex-column align-items-center justify-content-around">
					<i class="fab fa-itunes-note"></i>
					<i class="fas fa-heartbeat"></i>
					<i class="fas fa-rainbow"></i>
					<i class="fas fa-redo-alt"></i>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	* { 
		margin: 0; 
		padding: 0; 
		border: 0;
	}
	.glass {
		background: rgba( 255, 255, 255, 0.10 );
		box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
		backdrop-filter: blur( 9.0px );
		-webkit-backdrop-filter: blur( 9.0px );
		border-radius: 25px;
		border: 1px solid rgba( 255, 255, 255, 0.18 );
	}
	.area {
		height: 90vh;
	}
	.layout {
		height: 100vh;
	}
	.colors {
		height: 90%;
		overflow-x: hidden;
		overflow-y: scroll;


		-ms-overflow-style: none;  /* IE and Edge */
  	scrollbar-width: none;  /* Firefox */
	}
	.colors::-webkit-scrollbar {
		display: none;
	}
	.modes {
		/* height: 100%; */
	}
	i {
		color: white;
		font-size: 6rem;
	}
</style>