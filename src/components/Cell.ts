/* eslint-disable prettier/prettier */
import { Container, Graphics, Text, Point } from "pixi.js";
import { drawLines, drawCircle } from "../utils/utils";
import { Tween } from "@tweenjs/tween.js";

export interface CellButtonConfig {
    width: number;
    height: number;
    onClick?: () => void;
    curTitle?: string;
    backColor?: number;
    textSize?: number;
}

interface GraphicsCrossConfigs {
    config: Point[][];
    main: {
        lineWidth: number;
        color: number;
        alpha: number;
        offset: {
            x: number;
            y: number;
        };
    };
}

interface GraphicsCircleConfigs {
    config: { x: number; y: number; r: number };
    main: {
        lineWidth: number;
        color: number;
        alpha: number;
        offset: {
            x: number;
            y: number;
        };
    };
}

const enabledColor = 0xffffff;
const disabledColor = 0x000000;

export class Cell extends Container {
    protected back: Graphics;
    protected title: Text;
    protected cellWidth: number;
    protected cellHeight: number;
    protected cellBackColor: number;
    protected cellState = true;
    protected newGrafLine = new Graphics();
    protected newGrafCircle = new Graphics();

    constructor({
        width,
        height,
        onClick = () => {
            // stub
        },
        curTitle,
        backColor,
        textSize,
    }: CellButtonConfig) {
        super();

        this.back = new Graphics();
        this.title = new Text(curTitle || "", { fill: enabledColor, fontSize: textSize || 14 });
        this.title.anchor.set(0.5, 0.5);
        this.cellWidth = width;
        this.cellHeight = height;
        this.cellBackColor = backColor || 0xcc3333;

        this.addChild(this.back);
        this.addChild(this.title);

        this.drawCellBack();

        this.interactive = true;
        this.cursor = "pointer";

        this.on("mousedown", () => {
            this.drawCellBack(1);
        });
        this.on("mouseup", () => {
            this.drawCellBack();
            this.interactive = false;
            onClick();
        });
    }

    drawCellBack(opacity = 0.5) {
        const gr = this.back;
        gr.clear();

        gr.lineStyle(5, this.cellState ? enabledColor : disabledColor, 1);
        gr.drawRoundedRect(-(this.cellWidth / 2), -(this.cellHeight / 2), this.cellWidth, this.cellHeight, 0);

        gr.lineStyle(0, 0xffcc33, 0.9);
        gr.beginFill(this.cellBackColor, opacity);
        gr.drawRoundedRect(-(this.cellWidth / 2), -(this.cellHeight / 2), this.cellWidth, this.cellHeight, 0);
        gr.endFill();
    }

    setEnabled(state: boolean) {
        this.cellState = state;
        this.interactive = state;

        if (state) {
            this.title.style.fill = enabledColor;
        } else {
            this.title.style.fill = disabledColor;
        }

        this.drawCellBack();
    }

    setBackColor(value: number) {
        this.cellBackColor = value;
        this.drawCellBack();
    }
    setTitle(value: string) {
        this.title.text = value;
    }
    setCross({ config, main }: GraphicsCrossConfigs) {
        drawLines(this.newGrafLine, config, main);
        this.addChild(this.newGrafLine);
    }
    setCircle({ config, main }: GraphicsCircleConfigs) {
        drawCircle(this.newGrafCircle, config, main);
        this.addChild(this.newGrafCircle);
    }

    cleaningGraphs() {
        this.newGrafLine.clear();
        this.newGrafCircle.clear();
    }

    animateOut(outDuration: number) {
        const tweenScaleOut = new Tween(this).to({ scale: { x: 0 } }, outDuration);
        return new Promise((resolve) => {
            tweenScaleOut.onComplete(resolve);
            tweenScaleOut.start();
        });
    }

    animateIn(inDuration: number) {
        const tweenScaleIn = new Tween(this).to({ scale: { x: 1 } }, inDuration);
        return new Promise((resolve) => {
            tweenScaleIn.onComplete(resolve);
            tweenScaleIn.start();
        });
    }
}
