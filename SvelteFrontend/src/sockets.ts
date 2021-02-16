import type {CurrentMode, CurrentSelectedIndex, OnState, PresetColors, SimpleColor, SimpleColorsSelected, State, TimeoutDelay} from './typeInterface';
import {io} from "socket.io-client";

const socket = io("https://nanoroot.xires.de");

/**
 * One time fetch of the current color object
 */
export async function getCurrentColorObject(): Promise<State> {
    return (await fetch(`https://nanoroot.xires.de/currentColorObject`)).json() as Promise<State>
}


export function onTimeoutDelay(callback: (value: TimeoutDelay) => void) {
    socket.on('TimeoutDelay', callback)
}

export function sendTimeoutDelay(value: TimeoutDelay) {
    socket.emit('TimeoutDelay', value)
}

export function onOnState(callback: (value: OnState) => void) {
    socket.on('OnState', callback)
}

export function sendOnState(value: OnState) {
    socket.emit('OnState', value)
}

export function onCurrentMode(callback: (value: CurrentMode) => void) {
    socket.on('CurrentMode', callback)
}

export function sendCurrentMode(value: CurrentMode) {
    socket.emit('CurrentMode', value)
}



export function onSimpleColor(callback: (value: SimpleColor) => void) {
    socket.on('SimpleColor', callback)
}

export function sendSimpleColor(value: SimpleColor) {
    socket.emit('SimpleColor', value)
}

export function onPresetColors(callback: (value: PresetColors) => void) {
    socket.on('PresetColors', callback)
}

export function sendPresetColors(value: PresetColors) {
    socket.emit('PresetColors', value)
}

export function onSimpleColorsSelected(callback: (value: SimpleColorsSelected) => void) {
    socket.on('SimpleColorsSelected', callback)
}

export function sendSimpleColorsSelected(value: SimpleColorsSelected) {
    socket.emit('SimpleColorsSelected', value)
}

export function onCurrentSelectedIndex(callback: (value: CurrentSelectedIndex) => void) {
    socket.on('CurrentSelectedIndex', callback)
}

export function sendCurrentSelectedIndex(value: CurrentSelectedIndex) {
    socket.emit('CurrentSelectedIndex', value)
}