<script lang="ts">
	import { state } from "./sockets";

	var editTimer = false;
	var timeInMin = 5;

	function power() {
		$state.onState = !$state.onState
	}
	function saveTimer() {
		$state.timeoutDelay = timeInMin
		editTimer = false;
	}
	function subtractTime() {
		if (timeInMin - 1 > 0) {
			timeInMin--;
		}
	}
	function addTime() {
		if (timeInMin <= 60) {
			timeInMin++;
		}
	}
</script>

<div class="row d-flex justify-content-between buttons">
	{#if !editTimer}
		<button
			on:click={power}
			type="button"
			id="powerButton"
			class="col-md btn button {$state != undefined && $state.onState
				? 'btn-danger'
				: 'btn-info'}"
		>
			{$state != undefined && $state.onState ? "Ausschalten" : "Einschalten"}</button
		>
		<button
			on:click={() => {
				editTimer = true;
				timeInMin = $state.timeoutDelay;
			}}
			type="button"
			id="timerButton"
			class="col-md btn btn-primary button">Timer</button
		>
	{:else}
		<div class="row d-flex justify-content-between timerInput">
			<button
				on:click={subtractTime}
				type="button"
				id="subtractTime"
				class="col btn btn-danger">-</button
			>
			<div class="col time">{timeInMin}</div>
			<button
				on:click={addTime}
				type="button"
				id="addTime"
				class="col btn btn-info">+</button
			>
		</div>
		<button
			on:click={saveTimer}
			type="button"
			id="timerButton"
			class="col-md btn btn-primary button">Speichern</button
		>
	{/if}
</div>

<style>
	.buttons {
		height: 10%;
		margin-top: 2rem;
	}
	.button {
		width: 40%;
		height: 50%;
		margin-left: 2rem;
		margin-right: 2rem;
		margin-top: auto;
		margin-bottom: auto;
	}
	.timerInput {
		width: 40%;
		height: 50%;
		margin-left: 2rem;
		margin-right: 2rem;
		margin-top: auto;
		margin-bottom: auto;
	}
	.time {
		color: white;
		font-weight: bold;
		padding: 1rem;
	}

	@media (min-width: 992px) {
		.buttons {
			margin-top: 0rem;
		}
	}
</style>
