/* eslint-disable prettier/prettier */
import { Graphics } from "pixi.js";

export interface ColorPlaneConfig {
    size: {
        width: number;
        height: number;
    };
    border?: {
        color: number;
        width: number;
        opacity: number;
    };
    sideBorder?: {
        color: number;
        width: number;
        opacity: number;
    };
    color?: number;
    radius?: number;
    opacity?: number;
}

export class ColorPlane extends Graphics {
    constructor({ size, border, sideBorder, color, radius, opacity = 1 }: ColorPlaneConfig) {
        super();
        this.clear();
        if (sideBorder) {
            this.lineStyle(sideBorder.width || 2, sideBorder.color || 0x7fff00, sideBorder.opacity || 1);
        }
        border && this.lineStyle(border.width, border.color, border.opacity);
        color && this.beginFill(color, opacity);
        this.drawRoundedRect(-size.width / 2, -size.height / 2, size.width, size.height, radius || 0);
        color && this.endFill();
    }
}
