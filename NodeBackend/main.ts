
import './html/express_main'
import {io} from './html/express_main'
import './mqtt/mqtt_main'
import {StateManager} from './state'



export const state = new StateManager(io)

