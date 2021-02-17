export enum ModeTypes {
    MUSIC,
    RAINBOW,
    PULSATING,
    SMOOTH_TRANSITIONING
}

export interface TimeoutDelay {
    minutes: number
}

export interface OnState {
    on: boolean
}

export interface CurrentMode {
    mode: ModeTypes
}



export interface ChangeSimpleColor {
    color: string
}

export interface AddSimpleColor {
    color: string
}

export interface RemoveSimpleColor {
    index: number
}


export interface ChangePresetColors {
    colors: string[]
}

export interface AddPresetColors {
    colors: string[]
}

export interface RemovePresetColors {
    index: number
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