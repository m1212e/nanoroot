import type {ConfiguredColors, Mode} from './typeInterfacenterface';
import {io} from "socket.io-client";
const socket = io("https://nanoroot.xires.de");

/**
 * One time fetch of the current color object
 */
export async function getCurrentColorObject(): Promise<ConfiguredColors> {
    return (await fetch(`https://nanoroot.xires.de/currentColorObject`)).json() as Promise<ConfiguredColors>
}

/**
 * Executes callback when a mode update is recieved
 * 
 * @param callback function which is called with the mode object on change
 */
export function onMode(callback) {
    socket.on('Mode', callback)
}

/**
 * Pushes new Mode to other clients and the server
 * 
 * @param callback the new mode
 */
export function sendMode(mode: Mode) {
    socket.emit('Mode', mode)
}

/**
 * Executes callback when a simple color is updated
 * 
 * @param callback function which is called with the new hex code
 */
export function onSimpleColor(callback) {
    socket.on('simpleColor', callback)
}

/**
 * Pushes new simple color to other clients and the server
 * 
 * @param callback the new simple color
 */
export function sendSimpleColor(mode: SimpleColor) {
    socket.emit('Mode', mode)
}

/**
 * Executes callback when a preset color array is updated
 * 
 * @param callback function which is called with the new hex codes array
 */
export function onPresetColors(callback) {
    socket.on('presetColors', callback)
}

/**
 * Executes callback when the selected state switches
 * 
 * @param callback function which is called with the new data. First argument: current index. Second argument: boolean if simple colors are selected
 */
export function onSelected(callback) {
    socket.on('selected', (data) => {
        callback(data.selectedIndex, data.simple)
    })
}

/**
 * Executes callback when the timeout delay changes
 * 
 * @param callback function which is called with the new timeout value
 */
export function onTimeoutDelay(callback) {
    socket.on('TimeoutDelay', callback)
}

/**
 * Executes callback when the On state switches
 * 
 * @param callback function which is called with the new on state
 */
export function onOnState(callback) {
    socket.on('TimeoutDelay', callback)
}