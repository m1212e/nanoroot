import type {CurrentMode, CurrentSelectedIndex, OnState, ChangePresetColors, ChangeSimpleColor, SimpleColorsSelected, State, TimeoutDelay, AddSimpleColor, RemoveSimpleColor, AddPresetColors, RemovePresetColors} from '../../NodeBackend/typeInterface';
import {io} from "socket.io-client";
import {writable} from 'svelte/store';

export const state = writable<State>(undefined);
state.subscribe(data => console.log(data));

// const socket = io("https://nanoroot.xires.de");//prod
const socket = io("http://localhost:3000");//dev


// fetch(`https://nanoroot.xires.de/currentColorObject`).then(d => d.json()).then(d => state.set(d))
socket.on('baseData', (d) => state.set(d))

export function onTimeoutDelay() {
    socket.on('TimeoutDelay', (data: TimeoutDelay) => {
        state.update(current => {current.timeoutDelay = data.minutes; return current})
    })
}

export function sendTimeoutDelay(value: TimeoutDelay) {
    socket.emit('TimeoutDelay', value)
}


export function onOnState() {
    socket.on('OnState', (data: OnState) => {
        state.update(current => {current.onState = data.on; return current})
    })
}

export function sendOnState(value: OnState) {
    socket.emit('OnState', value)
}


export function onCurrentMode() {
    socket.on('CurrentMode', (data: CurrentMode) => {
        state.update(current => {current.currentMode = data.mode; return current})
    })
}

export function sendCurrentMode(value: CurrentMode) {
    socket.emit('CurrentMode', value)
}



//TODO: ab hier weiter implementieren


export function onChangeSimpleColor() {
    socket.on('ChangeSimpleColor', (data: ChangeSimpleColor) => {
        state.update(current => {
            current.simpleColors[current.index] = data.color
            return current
        })
    })
}

export function sendChangeSimpleColor(value: ChangeSimpleColor) {
    socket.emit('ChangeSimpleColor', value)
}

export function onAddSimpleColor() {
    socket.on('AddSimpleColor', (data: AddSimpleColor) => {
        state.update(current => {
            current.simpleColors.push(data.color)
            return current
        })
    })
}

export function sendAddSimpleColor(value: AddSimpleColor) {
    socket.emit('AddSimpleColor', value)
}

export function onRemoveSimpleColor() {
    socket.on('RemoveSimpleColor', (data: RemoveSimpleColor) => {
        state.update(current => {
            current.simpleColors = current.simpleColors.slice(data.index, 1)
            return current
        })
    })
}

export function sendRemoveSimpleColor(value: RemoveSimpleColor) {
    socket.emit('RemoveSimpleColor', value)
}




export function onChangePresetColors() {
    socket.on('ChangePresetColors', (data: ChangePresetColors) => {
        state.update(current => {
            current.presetColors[current.index] = data.colors
            return current
        })
    })
}

export function sendChangePresetColors(value: ChangePresetColors) {
    socket.emit('ChangePresetColors', value)
}

export function onAddPresetColors() {
    socket.on('AddPresetColors',  (data: AddPresetColors) => {
        state.update(current => {
            current.presetColors.push(data.colors)
            return current
        })
    })
}

export function sendAddPresetColors(value: AddPresetColors) {
    socket.emit('AddPresetColors', value)
}

export function onRemovePresetColors() {
    socket.on('RemovePresetColors', (data: RemovePresetColors) => {
        state.update(current => {
            current.presetColors = current.presetColors.slice(data.index, 1)
            return current
        })
    })
}

export function sendRemovePresetColors(value: RemovePresetColors) {
    socket.emit('RemovePresetColors', value)
}




export function onSimpleColorsSelected() {
    socket.on('SimpleColorsSelected',  (data: SimpleColorsSelected) => {
        state.update(current => {current.simpleColorsSelected = data.simpleColorsSelected; return current})
    })
}

export function sendSimpleColorsSelected(value: SimpleColorsSelected) {
    socket.emit('SimpleColorsSelected', value)
}


export function onCurrentSelectedIndex() {
    socket.on('CurrentSelectedIndex',  (data: CurrentSelectedIndex) => {
        state.update(current => {current.index = data.index; return current})
    })
}

export function sendCurrentSelectedIndex(value: CurrentSelectedIndex) {
    socket.emit('CurrentSelectedIndex', value)
}