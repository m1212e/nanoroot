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

export interface SimpleColorsSelected {
    simpleColorsSelected: boolean
}

export interface CurrentSelectedIndex {
    index: number
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


export interface AddPresetColors {
    colors: string[]
}

export interface RemovePresetColors {
    index: number
}

export interface ChangePresetColorsIndex {
    index: number
}

export interface ChangePresetColor {
    color: string
}

export interface AddPresetColor {
    color: string
}

export interface RemovePresetColor {
    index: number
}