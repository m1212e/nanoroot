export enum ModeTypes {
    MUSIC,
    RAINBOW,
    PULSATING,
    SMOOTH_TRANSITIONING
}

export interface ConfiguredColors {
    simpleColors: string[]
    presetColors: string[][]
    selectedIndex: number
    simple: boolean
}

export interface Mode {
    mode: ModeTypes
}

export interface Colors {
    colors: string[]
}

export interface TimeoutDelay {
    timeoutDelay: number
}

export interface OnState {
    on: boolean
}

export interface SimpleColors {
    simpleColors: string[]
}
