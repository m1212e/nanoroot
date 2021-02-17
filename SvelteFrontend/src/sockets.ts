import type {CurrentMode, CurrentSelectedIndex, OnState, ChangePresetColors, ChangeSimpleColor, SimpleColorsSelected, State, TimeoutDelay, AddSimpleColor, RemoveSimpleColor, AddPresetColors, RemovePresetColors} from '../../NodeBackend/typeInterface';
import {io} from "socket.io-client";
import {writable} from 'svelte/store';
import {get} from 'svelte/store';

export const state = writable<State>(undefined);
state.subscribe(data => console.log(data));

// const socket = io("https://nanoroot.xires.de");//prod
const socket = io("http://localhost:3000");//dev


// fetch(`https://nanoroot.xires.de/currentColorObject`).then(d => d.json()).then(d => state.set(d))
socket.on('baseData', (d) => state.set(d))

socket.on('TimeoutDelay', (data: TimeoutDelay) => {
    state.update(current => {current.timeoutDelay = data.minutes; return current})
})

export function sendTimeoutDelay(value: TimeoutDelay) {
    if (value.minutes != get(state).timeoutDelay) {
        socket.emit('TimeoutDelay', value)
    }
}


socket.on('OnState', (data: OnState) => {
    state.update(current => {current.onState = data.on; return current})
})

export function sendOnState(value: OnState) {
    if (value.on != get(state).onState) {
        socket.emit('OnState', value)
    }
}


socket.on('CurrentMode', (data: CurrentMode) => {
    state.update(current => {current.currentMode = data.mode; return current})
})

export function sendCurrentMode(value: CurrentMode) {
    if (value.mode != get(state).currentMode) {
        socket.emit('CurrentMode', value)
    }
}





socket.on('ChangeSimpleColor', (data: ChangeSimpleColor) => {
    state.update(current => {
        current.simpleColors[current.index] = data.color
        return current
    })
})

export function sendChangeSimpleColor(value: ChangeSimpleColor) {
    const s = get(state);
    if (value.color != s.simpleColors[s.index]) {
        socket.emit('ChangeSimpleColor', value)
    }
}

socket.on('AddSimpleColor', (data: AddSimpleColor) => {
    state.update(current => {
        current.simpleColors.push(data.color)
        return current
    })
})

export function sendAddSimpleColor(value: AddSimpleColor) {
    socket.emit('AddSimpleColor', value)
}

socket.on('RemoveSimpleColor', (data: RemoveSimpleColor) => {
    state.update(current => {
        current.simpleColors = current.simpleColors.slice(data.index, 1)
        return current
    })
})

export function sendRemoveSimpleColor(value: RemoveSimpleColor) {
    socket.emit('RemoveSimpleColor', value)
}




socket.on('ChangePresetColors', (data: ChangePresetColors) => {
    state.update(current => {
        current.presetColors[current.index] = data.colors
        return current
    })
})

export function sendChangePresetColors(value: ChangePresetColors) {
    const s = get(state);
    if (value.colors != s.presetColors[s.index]) {
        socket.emit('ChangePresetColors', value)
    }
}

socket.on('AddPresetColors', (data: AddPresetColors) => {
    state.update(current => {
        current.presetColors.push(data.colors)
        return current
    })
})

export function sendAddPresetColors(value: AddPresetColors) {
    socket.emit('AddPresetColors', value)
}

socket.on('RemovePresetColors', (data: RemovePresetColors) => {
    state.update(current => {
        current.presetColors = current.presetColors.slice(data.index, 1)
        return current
    })
})

export function sendRemovePresetColors(value: RemovePresetColors) {
    socket.emit('RemovePresetColors', value)
}




socket.on('SimpleColorsSelected', (data: SimpleColorsSelected) => {
    state.update(current => {current.simpleColorsSelected = data.simpleColorsSelected; return current})
})

export function sendSimpleColorsSelected(value: SimpleColorsSelected) {
    if (value.simpleColorsSelected != get(state).simpleColorsSelected) {
        socket.emit('SimpleColorsSelected', value)
    }
}


socket.on('CurrentSelectedIndex', (data: CurrentSelectedIndex) => {
    state.update(current => {current.index = data.index; return current})
})

export function sendCurrentSelectedIndex(value: CurrentSelectedIndex) {
    if (value.index != get(state).index) {
        socket.emit('CurrentSelectedIndex', value)
    }
}
