import iro from '@jaames/iro';
import ColorButton from './ColorButton';

let buttons: ColorButton[] = [];
const hexColorInput = document.getElementById('hexColorInput') as HTMLInputElement;
const buttonArea = document.getElementById('buttonArea');
const storageValue = localStorage.getItem('buttons');

//event listener
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

document.getElementById('add').onclick = () => {
    buttons.push(new ColorButton('#e63232', changeColorEvent, buttonArea));
    saveToLocalStorage();
};

colorPicker.on('color:change', () => {
    buttons.find(b => b.selected).color = colorPicker.color.hexString;
    hexColorInput.value = colorPicker.color.hexString.substring(1);
    saveToLocalStorage();
});

//helpers
function changeColorEvent(color: string) {
    colorPicker.color.hexString = color;
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('buttons', JSON.stringify(buttons.map(b => b.color)));
}


//initialization
if (storageValue !== undefined && storageValue !== null && storageValue !== '""') {
    JSON.parse(storageValue).forEach(colorCode => {
        buttons.push(new ColorButton(colorCode, changeColorEvent, buttonArea));
    });
} else {
    buttons = [new ColorButton('#4287f5', changeColorEvent, buttonArea),
    new ColorButton('#ff1c68', changeColorEvent, buttonArea),
    new ColorButton('#39ff0d', changeColorEvent, buttonArea)
    ];
}

buttons[0].select();