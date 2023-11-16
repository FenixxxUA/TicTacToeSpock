/* eslint-disable prettier/prettier */
import { Text, TextStyle } from "pixi.js";

export class NumberText extends Text {
    constructor(textStyleConfig: TextStyle) {
        super("", textStyleConfig);
        this.anchor.set(0.5, 0.5);
    }

    setValue(value: number | string) {
        this.text = value;
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }
}
