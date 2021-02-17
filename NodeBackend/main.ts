
import './html/express_main'
import './mqtt/mqtt_main'
import {State} from './typeInterface'


export let state: State = {
    simpleColors: ['#FFFFFF'],
    presetColors: [['#FFFFFF', '#FAFAFA']],
    index: 0,
    simpleColorsSelected: true,
    currentMode: 0,
    timeoutDelay: 5,
    onState: true
}
