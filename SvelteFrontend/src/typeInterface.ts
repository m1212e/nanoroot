export enum ModeTypes {
    MUSIC,
    RAINBOW,
    PULSATING,
    SMOOTH_TRANSITIONING
}

export interface TimeoutDelay {
    seconds: number
}

export interface OnState {
    on: boolean
}

export interface CurrentMode {
    mode: ModeTypes
}



export interface SimpleColor {
    color: string
}

export interface PresetColors {
    colors: string[]
}

export interface SimpleColorsSelected {
    simpleColorsSelected: boolean
}

export interface CurrentSelectedIndex {
    index: number
}



export interface State {
    timeoutDelay: number,
    onState: boolean,
    simpleColors: string[],
    presetColors: string[][],
    simpleColorsSelected: boolean,
    currentMode: ModeTypes,
    index: number
}