import type {State} from '../../NodeBackend/state';
import {io} from "socket.io-client";
import {writable} from 'svelte/store';

// const socket = io("https://nanoroot.xires.de");//prod
const socket = io("http://localhost:3000");//dev

export const state = writable<State>(undefined);

let stateCopy: State = {
    onState: true,
    timeoutDelay: 5,
    simpleColors: ['#ffffff', '#eb4034'],
    presetColors: [['#eb4034', '#32a852'],
    ['#eb4034', '#32a852'],
    ['#eb4034', '#32a852', '#32a872', '#32a8a2']],
    simpleColorsSelected: true,
    currentMode: 4,
    index: 0,
    presetColorsIndex: 0
}

state.subscribe(data => {
    if (data != undefined) {
        Object.keys(data).forEach(key => {
            if (JSON.stringify(data[key]) != JSON.stringify(stateCopy[key])) {
                stateCopy[key] = JSON.parse(JSON.stringify(data[key]))
                sendChanges(key, data[key])
            }
        })
    }
});
socket.on('baseData', (d) => state.set(d))
socket.on('changes', (data: any) => {
    state.update(current => {
        Object.keys(data).forEach(key => {
            current[key] = data[key]
        })
        return current
    })
})



let timeout;
let changes: any = {};
export function sendChanges(path: string, value: any) {
    changes[path] = value
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        socket.emit('changes', changes);
        changes = {}
    }, 100)
}