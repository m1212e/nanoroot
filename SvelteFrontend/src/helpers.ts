import {get} from "svelte/store";
import {state} from "./sockets";

export enum ModeTypes {
    MUSIC,
    RAINBOW,
    PULSATING,
    SMOOTH_TRANSITIONING,
    DEFAULT
}

export interface State {
    timeoutDelay: number
    onState: boolean
    simpleColors: string[]
    presetColors: string[][]
    simpleColorsSelected: boolean
    currentMode: ModeTypes
    index: number
    presetColorsIndex: number
}


const hexRegex = new RegExp('^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$')
let timer;
/**
 * Sends a color change dependent on the currently selected colors
 * 
 * @param color color hex string (e.g. '#ffffff' for white)
 */
export function sendChangeColor(color: string) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (hexRegex.test(color)) {
            if (get(state).simpleColorsSelected) {
                state.update(current => {current.simpleColors[current.index] = color; return current})
            } else {
                state.update(current => {current.presetColors[current.index][current.presetColorsIndex] = color; return current})
            }
        } else {
            console.error('Detected invalid color. Not sending.')
        }
    }, 50);
}