/* eslint-disable prettier/prettier */
import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";

export interface SimpleButtonConfig {
    width: number;
    height: number;
    onClick?: () => void;
    curTitle?: string;
    backColor?: number;
    textSize?: number;
    texture?: Texture;
}

export class SimpleButton extends Container {
    protected back: Graphics;
    protected title: Text;
    protected btnWidth: number;
    protected btnHeight: number;
    protected btnBackColor: number;
    protected btnState = true;

    constructor({
        width,
        height,
        onClick = () => {
            // stub
        },
        curTitle,
        backColor,
        textSize,
        texture,
    }: SimpleButtonConfig) {
        super();
        this.back = new Graphics();
        this.title = new Text(curTitle || "", { fill: 0xffffff, fontSize: textSize || 14 });
        this.title.anchor.set(0.5, 0.5);
        this.btnWidth = width;
        this.btnHeight = height;
        this.btnBackColor = backColor || 0xcc3333;
        const sprite = new Sprite(texture);
        sprite.anchor.set(0.5);

        this.addChild(this.back);
        this.addChild(this.title, sprite);

        this.drawButtonBack();

        this.interactive = true;
        this.cursor = "pointer";

        this.on("mousedown", () => {
            this.drawButtonBack(1);
        });
        this.on("mouseup", () => {
            this.drawButtonBack();
            onClick();
        });
    }

    drawButtonBack(opacity = 0.5) {
        const gr = this.back;
        gr.clear();

        gr.drawRoundedRect(-(this.btnWidth / 2), -(this.btnHeight / 2), this.btnWidth, this.btnHeight, 10);

        gr.lineStyle(0, 0xffcc33, 0.9);
        gr.beginFill(this.btnBackColor, opacity);
        gr.drawRoundedRect(-(this.btnWidth / 2), -(this.btnHeight / 2), this.btnWidth, this.btnHeight, 10);
        gr.endFill();
    }

    setEnabled(state: boolean) {
        this.btnState = state;
        this.interactive = state;

        if (state) {
            this.title.style.fill = 0xffffff;
        } else {
            this.title.style.fill = 0x000000;
        }

        this.drawButtonBack();
    }

    setBackColor(value: number) {
        this.btnBackColor = value;
        this.drawButtonBack();
    }
    setTitle(value: string) {
        this.title.text = value;
    }
}
