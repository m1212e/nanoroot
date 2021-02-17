
import './html/express_main'
import './mqtt/mqtt_main'
import {State} from './typeInterface'


export let state: State = {
    simpleColors: ['#FFFFFF', '#eb4034'],
    presetColors: [['#FFFFFF', '#eb4034']],
    index: 0,
    simpleColorsSelected: true,
    currentMode: 0,
    timeoutDelay: 5,
    onState: true
}
