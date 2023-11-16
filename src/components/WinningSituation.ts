import { Container, TextStyle, Point } from "pixi.js";
import { Tween } from "@tweenjs/tween.js";
import { ColorPlane } from "../components/ColorPlane";
import { NumberText } from "../components/NumberText";

interface WinConfigs {
    winBackConfig: {
        size: {
            width: number;
            height: number;
        };
        position: Point;
        color: number;
        opacity: number;
    };
    winTitleConfig: {
        text: string;
        position: Point;
        textStyle: TextStyle;
    };
}

export class WinningSituation extends Container {
    private winText: NumberText;

    constructor({ winBackConfig, winTitleConfig }: WinConfigs) {
        super();
        const winBack = new ColorPlane(winBackConfig);
        winBack.position.copyFrom(winBackConfig.position);
        // Text area
        this.winText = new NumberText(winTitleConfig.textStyle);
        this.winText.setValue(winTitleConfig.text);
        this.winText.position.copyFrom(winTitleConfig.position);

        this.addChild(winBack, this.winText);
        this.visible = false;
    }

    animate(outDuration: number, inDuration: number) {
        this.visible = true;
        const tweenFadeIn = new Tween(this).to({ alpha: 1 }, inDuration);
        const tweenFadeOut = new Tween(this).to({ alpha: 0 }, outDuration);
        tweenFadeIn.chain(tweenFadeOut);
        return new Promise<void>((resolve) => {
            tweenFadeOut.onComplete(() => {
                this.visible = false;
                resolve();
            });
            tweenFadeIn.start();
        });
    }
}
