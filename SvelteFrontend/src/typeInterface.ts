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

export interface SimpleColors {
    colors: string[]
}

export interface PresetColors {
    colors: string[][]
}

export interface SelectState {
    simpleColorsSelected: boolean
}