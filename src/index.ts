import { Loader } from "pixi.js";
import "./style.css";
import { PixiApp } from "./module/PixiApp";
import { update as TweenUpdate } from "@tweenjs/tween.js";
import { TicTacToeSpock } from "./module/TicTacToeSpock/TicTacToeSpock";
import { assetsConfig } from "./config";

window.onload = async (): Promise<void> => {
    await loadGameAssets();
    document.body.appendChild(PixiApp.getView());
    PixiApp.resize();
    window.addEventListener("resize", () => PixiApp.resize());

    const stage = PixiApp.getStage();
    // Main
    const mainApp = new TicTacToeSpock();
    mainApp.scale.set(0.9, 0.9);
    mainApp.position.set(50, 25);
    stage.addChild(mainApp);

    ///////////////////////////////
    /////// TRY THESE ASWEL ///////
    ///////////////////////////////
    // // Main app
    // const mainApp = new TicTacToeSpock();
    // mainApp.scale.set(1, 0.3);
    // stage.addChild(mainApp);
    // // Second app
    // const secondApp = new TicTacToeSpock();
    // secondApp.scale.set(0.3, 0.3);
    // secondApp.position.set(400, 200);
    // stage.addChild(secondApp);
    // // Third app
    // const thirdApp = new TicTacToeSpock();
    // thirdApp.scale.set(0.4, 0.6);
    // thirdApp.position.set(0, 200);
    // stage.addChild(thirdApp);

    stage.addChild(mainApp);

    PixiApp.getTicker().add(() => {
        TweenUpdate();
    });
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        for (const key in assetsConfig) {
            loader.add(key, assetsConfig[key]);
        }

        loader.onComplete.once(() => {
            res();
        });
        loader.onError.once(() => {
            rej();
        });
        loader.load();
    });
}
