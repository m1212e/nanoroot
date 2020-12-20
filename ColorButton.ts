export default class ColorButton {
    static allColorButtons: ColorButton[] = [];
    private buttonParent: HTMLElement;
    private _color = '#ffffff';
    private _selected = false;
    private _domButton;
    onSelectMethod;

    /**
     * Constructs a new ColorButton
     * 
     * @param color Default color (undefined == white)
     * @param callback Method to use for changing the color of the colorPicker. Gets called with color hex values
     * @param buttonParent Parent Element of the created button
     */
    constructor(color: string, callback: any, buttonParent: HTMLElement) {
        if (buttonParent === undefined) {
            console.error('You need to define a button parent!.');
            return;
        } else {
            this.buttonParent = buttonParent;
        }
        if (color !== null && color !== undefined) {
            this._color = color;
        }
        ColorButton.allColorButtons.push(this);
        this.insertToHTML();
        this.onSelectMethod = callback;
    }

    get selected() {
        return this._selected;
    }

    set selected(selected: boolean) {
        this._selected = selected;
        this._domButton.style.borderColor = this._selected ? 'var(--backgroundColor)' : '#ffffff';
    }

    get color(): string {
        return this._color;
    }

    set color(color: string) {
        this._color = color;
        this._domButton.style.backgroundColor = color;
    }

    insertToHTML() {
        this._domButton = this.buttonParent.appendChild(this.getDOMElement());
        this.registerEventListener();
    }

    registerEventListener() {
        this._domButton.onclick = () => {
            this.select();
        };

        this._domButton.oncontextmenu = () => {
            this.select();
        };
    }

    getHTMLRepresentation() {
        return `<button class="btn btn-outline-light m-3" data-mdb-ripple-color="dark"
        style="height: 50px; width: 50px; background-color: ${this._color}; border-color: ${this._selected ? 'var(--backgroundColor)' : '#ffffff'};"></button>`;
    }

    getDOMElement() {
        if (this._domButton === undefined) {
            const template = document.createElement('template');
            template.innerHTML = this.getHTMLRepresentation();
            return template.content.firstChild;
        } else {
            return this._domButton;
        }
    }

    deselect() {
        this.selected = false;
    }

    select() {
        ColorButton.allColorButtons.forEach(e => e.deselect());
        this.selected = true;
        try {
            this.onSelectMethod(this.color);
        } catch (error) {
            console.error('Error in OnClick callback function. (The attribute must be a callable function!)');
        }
    }
}