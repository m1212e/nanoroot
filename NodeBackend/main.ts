
import './html/express_main'
import './mqtt/mqtt_main'
import {State} from './typeInterface'


export let state: State = {
    simpleColors: ['#FFFFFF', '#eb4034'],
    presetColors: [['#eb4034', '#32a852'],
        ['#eb4034', '#32a852'],
        ['#eb4034', '#32a852', '#32a872', '#32a8a2']],
    index: 0,
    simpleColorsSelected: true,
    currentMode: 1,
    timeoutDelay: 5,
    onState: true,
    presetColorsIndex: 0
}
