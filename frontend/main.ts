import iro from '@jaames/iro';
import ColorButton from './ColorButton';
import {sendMessage} from './mqtt';

let buttonArray: ColorButton[] = [];
const hexColorInput = document.getElementById('hexColorInput') as HTMLInputElement;
const buttonArea = document.getElementById('buttonArea');
const deleteButton = document.getElementById('del');

let deleteModeActive = false;

let colorPicker;
if (window.innerWidth >= 1200) {
    colorPicker = new (iro.ColorPicker as any)('#picker', {
        width: 500
    });
} else {
    colorPicker = new (iro.ColorPicker as any)('#picker', {
        width: 350
    });
}

//listener
deleteButton.onclick = () => {
    deleteModeActive = !deleteModeActive;
    updateDeleteButtonUI();
    saveToStorage();
}

function updateDeleteButtonUI() {
    deleteButton.innerHTML = deleteModeActive ? '<i class="fas fa-lock-open"></i>' : '<i class="fas fa-lock"></i>';
}

document.getElementById('add').onclick = () => {
    buttonArray.push(new ColorButton('#ff3232', onButtonSelectEvent, buttonArea));
    buttonArray[buttonArray.length - 1].select();
    saveToStorage();
};

colorPicker.on('color:change', () => {
    buttonArray.find(b => b.selected).color = colorPicker.color.hexString;
    hexColorInput.value = colorPicker.color.hexString.substring(1);
    saveToStorage();
});

hexColorInput.oninput = () => {
    if(hexColorInput.value.length === 6){
        colorPicker.color.hexString = hexColorInput.value;
    }
}

//helpers
function onButtonSelectEvent(color: string) {
    if (!deleteModeActive) {
        colorPicker.color.hexString = color;
    } else {
        if (buttonArray.length > 1) {
            let index = buttonArray.findIndex(b => b.selected);
            buttonArray.splice(index, 1);
            sendMessage(JSON.stringify({
                selectedIndex: (((index-1) > -1) ? index-1 : index),
                buttons: buttonArray.map(b => {
                    return b.color
                })
            }));
        }
    }
}

function saveToStorage() {
    sendMessage(JSON.stringify({
        deleteMeodeActive: deleteModeActive,
        selectedIndex: buttonArray.findIndex(b => b.selected),
        buttons: buttonArray.map(b => {
            return b.color
        })
    }));
}

function onStorageUpdate(JSONPayload: string) {
    console.log(JSONPayload);
    if (JSONPayload !== undefined && JSONPayload !== null && JSONPayload !== '""' && JSONPayload !== '') {
        buttonArea.innerHTML = "";
        buttonArray.length = 0;

        const parsed = JSON.parse(JSONPayload);

        parsed.buttons.forEach(color => {
            buttonArray.push(new ColorButton(color, onButtonSelectEvent, buttonArea));
        });
        buttonArray[parsed.selectedIndex].selected = true;
        colorPicker.color.hexString = buttonArray[parsed.selectedIndex].color;
        if (!buttonArray.find(b => b.selected) && buttonArray.length > 0) {
            buttonArray[0].select();
        }

        deleteModeActive = parsed.deleteMeodeActive;
        updateDeleteButtonUI();
    } else {
        buttonArray = [new ColorButton('#4287f5', onButtonSelectEvent, buttonArea),
        new ColorButton('#ff1c68', onButtonSelectEvent, buttonArea),
        new ColorButton('#39ff0d', onButtonSelectEvent, buttonArea)
        ];
        buttonArray[0].select();
    }

}

export {onStorageUpdate}