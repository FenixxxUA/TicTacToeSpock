/* eslint-disable prettier/prettier */
import { gameHeight, gameWidth } from "./TicTacToeSpock/TicTacToeSpockSettings";

import { Application, DisplayObject, Point, Loader, Texture } from "pixi.js";

class PixiAppClass {
    private app: Application;
    constructor(width: number, height: number) {
        this.app = new Application({
            backgroundColor: 0x000000,
            width,
            height,
        });
    }

    getStage() {
        return this.app.stage;
    }

    getView() {
        return this.app.view;
    }

    getTicker() {
        return this.app.ticker;
    }

    resize() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / gameWidth;
        this.app.stage.scale.y = window.innerHeight / gameHeight;
    }

    getGlobalPosition(target: DisplayObject): Point {
        const { x, y } = target.getGlobalPosition();
        return new Point(x / this.app.stage.scale.x, y / this.app.stage.scale.y);
    }

    getTexture(textureId: string) {
        return Loader.shared.resources[textureId] && Loader.shared.resources[textureId].texture
            ? Loader.shared.resources[textureId].texture!
            : Texture.EMPTY;
    }
}

export const PixiApp = new PixiAppClass(gameWidth, gameHeight);
