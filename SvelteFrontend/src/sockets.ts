import type {CurrentMode, CurrentSelectedIndex, OnState, ChangeSimpleColor, SimpleColorsSelected, State, TimeoutDelay, AddSimpleColor, RemoveSimpleColor, AddPresetColors, RemovePresetColors, ChangePresetColorsIndex, ChangePresetColor, AddPresetColor, RemovePresetColor} from '../../NodeBackend/typeInterface';
import {io} from "socket.io-client";
import {writable} from 'svelte/store';
import {get} from 'svelte/store';

export const state = writable<State>(undefined);
state.subscribe(data => console.log(Date.now(), data));

// const socket = io("https://nanoroot.xires.de");//prod
const socket = io("http://localhost:3000");//dev


// fetch(`https://nanoroot.xires.de/currentColorObject`).then(d => d.json()).then(d => state.set(d))
socket.on('baseData', (d) => state.set(d))

const hexRegex = new RegExp('^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$')
let timer;
/**
 * Sends a color change dependent on the currently selected colors
 * 
 * @param color color hex string (e.g. '#FFFFFF' for white)
 */
export function sendChangeColor(color: string) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (hexRegex.test(color)) {
            if (get(state).simpleColorsSelected) {
                sendChangeSimpleColor({color})
            } else {
                sendChangePresetColor({color})
            }
        } else {
            console.error('Detected invalid color. Not sending.')
        }
    }, 50);
}

/**
 * @returns The currently shown color code as hex string
 */
export function getCurrentColorCode(): string {
    const s = get(state)
    if (s.simpleColorsSelected) {
        return s.simpleColors[s.index] 
    } else {
        let color
        color = s.presetColors[s.index][s.presetColorsIndex]
        if (color == undefined) {
            color = s.presetColors[s.index][0]
            state.update(current => {current.presetColorsIndex = 0; return current})
        }
        return color
    }
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

socket.on('ChangePresetColorsIndex', (data: ChangePresetColorsIndex) => {
    state.update(current => {
        current.presetColorsIndex = data.index
        return current
    })
})
export function sendChangePresetColorsIndex(value: ChangePresetColorsIndex) {
    socket.emit('ChangePresetColorsIndex', value)
}

socket.on('ChangePresetColor', (data: ChangePresetColor) => {
    state.update(current => {
        current.presetColors[current.index][current.presetColorsIndex] = data.color
        return current
    })
})
export function sendChangePresetColor(value: ChangePresetColor) {
    socket.emit('ChangePresetColor', value)
}

socket.on('AddPresetColor', (data: AddPresetColor) => {
    state.update(current => {
        current.presetColors[current.index].push(data.color)
        return current
    })
})
export function sendAddPresetColor(value: AddPresetColor) {
    socket.emit('ChangePresetColor', value)
}

socket.on('RemovePresetColor', (data: RemovePresetColor) => {
    state.update(current => {
        current.presetColors[current.index] = current.presetColors[current.index].slice(data.index, 1)
        return current
    })
})
export function sendRemovePresetColor(value: RemovePresetColor) {
    socket.emit('RemovePresetColor', value)
}