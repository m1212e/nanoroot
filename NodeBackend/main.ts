
import './html/express_main'
import {io} from './html/express_main'
import './mqtt/mqtt_main'
import {StateManager} from './state'
import * as fs from 'fs'

export let state
let file

try {
    file = JSON.parse(fs.readFileSync('./data', 'utf-8'))
} catch (error) { }

if (file != undefined) {
    state = new StateManager(io, undefined)
} else {
    state = new StateManager(io, undefined)
}
// setInterval(() => {
//     console.log(JSON.stringify(state.toState()));
    
//     fs.writeFileSync('./data', JSON.stringify(state.toState()))
// }, 1000)