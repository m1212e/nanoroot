<script lang="ts">
import { onMount } from "svelte";

	import Buttons from "./Buttons.svelte";
	import ColorPicker from "./ColorPicker.svelte";
	import Colors from "./Colors.svelte";
	import ColorSets from "./ColorSets.svelte";
	import { sendCurrentMode, state } from "./sockets";

	onMount(() => {
		if(window.innerWidth > 991){
				document.getElementById('modeselector').classList.add('flex-column');
			}
	})

	window.addEventListener('resize', () => {
		window.onresize = () => {
			if(window.innerWidth > 991){
				document.getElementById('modeselector').classList.add('flex-column');
			}else{
				document.getElementById('modeselector').classList.remove('flex-column');
			}
		}
	});
</script>

<main>
	<div class="row d-flex justify-content-around layout align-items-center">
		<div class="col-lg-3 glass area">
			<div class="colors">
				{#await $state}
					<div class="spinner-border text-light" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				{:then state}
					{#if state != undefined}
						<Colors />
						<ColorSets />
					{/if}
				{/await}
			</div>
			<Buttons />
		</div>
		<hr>
		<div class="col-lg-8 glass area">
			<div class="row h-100 d-flex align-items-center">
				<div class="col-lg-8">
					{#await $state}
						<div class="spinner-border text-light" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					{:then state}
						{#if state != undefined}
							<ColorPicker />
						{/if}
					{/await}
				</div>
				<div
					id="modeselector"
					class="col-lg-4 h-100 d-flex align-items-center justify-content-around"
				>
					<i
						on:click={() => sendCurrentMode({ mode: 0 })}
						class="fab fa-itunes-note {$state != undefined &&
						$state.currentMode == 0
							? 'selected'
							: ''}"
					/>
					<i
						on:click={() => sendCurrentMode({ mode: 1 })}
						class="fas fa-heartbeat {$state != undefined &&
						$state.currentMode == 1
							? 'selected'
							: ''}"
					/>
					<i
						on:click={() => sendCurrentMode({ mode: 2 })}
						class="fas fa-rainbow {$state != undefined &&
						$state.currentMode == 2
							? 'selected'
							: ''}"
					/>
					<i
						on:click={() => sendCurrentMode({ mode: 3 })}
						class="fas fa-redo-alt {$state != undefined &&
						$state.currentMode == 3
							? 'selected'
							: ''}"
					/>
					<i
						on:click={() => sendCurrentMode({ mode: 4 })}
						class="far fa-lightbulb {$state != undefined &&
						$state.currentMode == 4
							? 'selected'
							: ''}"
					/>
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

	hr {
		width: 90%;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	#modeselector {
		margin-top: 5rem;
		margin-bottom: 2rem;
	}

	.colors::-webkit-scrollbar {
		display: none;
	}

	i {
		color: white;
		font-size: 4rem;
		cursor: pointer;
	}
	
	.selected {
		text-shadow: 4px 6px rgba(85, 85, 85, 0.75);
		transition: 0.3s;
	}
	
	@media (min-width: 992px) { 
		hr {
			display: none;
		}

		#modeselector {
			margin-top: 0rem;
			margin-bottom: 0rem;
		}

		.glass {
			background: rgba(255, 255, 255, 0.1);
			box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
			backdrop-filter: blur(9px);
			-webkit-backdrop-filter: blur(9px);
			border-radius: 25px;
			border: 1px solid rgba(255, 255, 255, 0.18);
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

			-ms-overflow-style: none; /* IE and Edge */
			scrollbar-width: none; /* Firefox */
		}

		i {
			font-size: 6rem;
		}
	}
</style>
