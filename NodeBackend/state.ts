import {publishMQTTColors, publishMQTTTopic} from "./mqtt/mqtt_main";

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


export class StateManager implements State {
    private _onState = true;
    private _timeoutDelay = 5;
    private _simpleColors = ['#ffffff', '#eb4034'];
    private _presetColors = [['#eb4034', '#32a852'],
    ['#eb4034', '#32a852'],
    ['#eb4034', '#32a852', '#32a872', '#32a8a2']];
    private _simpleColorsSelected = true;
    private _currentMode = ModeTypes.DEFAULT;
    private _index = 0;
    private _presetColorsIndex = 0;

    io

    private timeout: NodeJS.Timeout;
    private changes: any = {};

    constructor(io, state: State) {
        this.io = io
        if (state != undefined) {
            this._onState = state.onState
            this._timeoutDelay = state.timeoutDelay
            this._simpleColors = state.simpleColors
            this._presetColors = state.presetColors
            this._simpleColorsSelected = state.simpleColorsSelected
            this._currentMode = state.currentMode
            this._index = state.index
            this._presetColorsIndex = state.presetColorsIndex
        }
    }


    public get onState() {
        return this._onState;
    }
    public set onState(onState) {
        if (this._onState != onState) {
            this._onState = onState;
            this.sendChangesToWS('onState', onState)
            publishMQTTTopic('onState', onState)
        }
    }

    public get timeoutDelay() {
        return this._timeoutDelay;
    }
    public set timeoutDelay(timeoutDelay) {
        if (this._timeoutDelay != timeoutDelay && timeoutDelay > 0) {
            this._timeoutDelay = timeoutDelay;
            this.sendChangesToWS('onState', timeoutDelay)
            publishMQTTTopic('timeoutDelay', timeoutDelay)
        }
    }

    public get simpleColors() {
        return this._simpleColors;
    }
    public set simpleColors(simpleColors) {
        if (JSON.stringify(this._simpleColors) != JSON.stringify(simpleColors) && simpleColors.length >= 1) {
            this._simpleColors = simpleColors;
            this.sendChangesToWS('simpleColors', simpleColors)
            publishMQTTColors()
        }
    }

    public get presetColors() {
        return this._presetColors;
    }
    public set presetColors(presetColors) {
        if (JSON.stringify(this._presetColors) != JSON.stringify(presetColors) && presetColors.length >= 1) {

            this._presetColors = presetColors;
            this.sendChangesToWS('presetColors', presetColors)
            publishMQTTColors()
        }
    }

    public get simpleColorsSelected() {
        return this._simpleColorsSelected;
    }
    public set simpleColorsSelected(simpleColorsSelected) {
        if (this._simpleColorsSelected != simpleColorsSelected) {
            this._simpleColorsSelected = simpleColorsSelected;
            this.sendChangesToWS('simpleColorsSelected', simpleColorsSelected)
            publishMQTTColors()
        }
    }

    public get currentMode() {
        return this._currentMode;
    }
    public set currentMode(currentMode) {
        if (this._currentMode != currentMode) {
            this._currentMode = currentMode;
            this.sendChangesToWS('currentMode', currentMode)
        }
    }

    public get index() {
        return this._index;
    }
    public set index(index) {
        if (this._index != index) {
            this._index = index;
            this.sendChangesToWS('index', index)
            publishMQTTColors()
        }
    }

    public get presetColorsIndex() {
        return this._presetColorsIndex;
    }
    public set presetColorsIndex(presetColorsIndex) {
        if (this._presetColorsIndex != presetColorsIndex) {
            this._presetColorsIndex = presetColorsIndex;
            this.sendChangesToWS('presetColorsIndex', presetColorsIndex)
        }
    }

    public toState(): State {
        return {
            onState: this.onState,
            timeoutDelay: this.timeoutDelay,
            simpleColors: this.simpleColors,
            presetColors: this.presetColors,
            simpleColorsSelected: this.simpleColorsSelected,
            currentMode: this.currentMode,
            index: this.index,
            presetColorsIndex: this.presetColorsIndex
        }
    }

    private sendChangesToWS(path, value) {
        this.changes[path] = value
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.io.sockets.emit('changes', this.changes);

            this.changes = {}
        }, 100)
    }
}