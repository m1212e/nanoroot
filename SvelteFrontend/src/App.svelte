<script lang="ts">
	import Buttons from "./Buttons.svelte";
	import ColorPicker from "./ColorPicker.svelte";
	import Colors from "./Colors.svelte";
	import ColorSets from "./ColorSets.svelte";
	import { state } from "./sockets";

	// var activeColor = 0;

	// 	var colors = ['#25BE30', '#072497', '#C5F637', '#EEF1EE', '#366B39',
	// 		'#D089C2', '#BD231B', '#53BBD3', '#E30DEF', '#4B1BAA',
	// 		'#E2FE47', '#E2FE47', '#0DB3A2', '#E77311', '#7aff6e',
	// 		'#784f19', '#341fcf'];
	// 	var colorSets = [
	//     ['#25BE30', '#072497', '#C5F637'],
	//     ['#EEF1EE', '#366B39', '#D089C2'],
	//     ['#E2FE47', '#0DB3A2', '#E77311', '#341fcf', '#341fcf'],
	//   ];
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
						<Colors colors={state.simpleColors} />
						<ColorSets colorSets={state.presetColors} />
					{/if}
				{/await}
			</div>
			<Buttons />
		</div>
		<div class="col-lg-8 glass area">
			<div class="row h-100 d-flex align-items-center">
				<div class="col-lg-8">
					{#await $state}
					<div class="spinner-border text-light" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
					{:then state}
						{#if state != undefined}
								<ColorPicker
									initColor={state.simpleColors[state.index]}
								/>
						{/if}
					{/await}
				</div>
				<div
					class="col-lg-4 h-100 d-flex flex-column align-items-center justify-content-around"
				>
					<i class="fab fa-itunes-note" />
					<i class="fas fa-heartbeat" />
					<i class="fas fa-rainbow" />
					<i class="fas fa-redo-alt" />
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
	.colors::-webkit-scrollbar {
		display: none;
	}
	i {
		color: white;
		font-size: 6rem;
	}
</style>
