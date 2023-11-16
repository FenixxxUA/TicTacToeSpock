import { Point, TextStyle } from "pixi.js";

export const gameWidth = 800;
export const gameHeight = 600;
export const mainSize = 3;

export const ticTacToeSpockConfigs = {
    playerOneConfigs: {
        color: 0x00008b,
    },
    playerTwoConfigs: {
        color: 0xdc143c,
    },
    colsRowsSize: { size: mainSize },
    btnConfig: {
        width: 204,
        height: 180,
        curTitle: "Click here",
        backColor: 0x009e8e,
    },
    linesSettings: {
        lineConfig: {
            main: {
                lineWidth: 15,
                color: 0xffffff,
                alpha: 1,
                offset: {
                    x: 3,
                    y: 3,
                },
            },
            winMain: {
                lineWidth: 7,
                color: 0xffffff,
                alpha: 1,
                offset: {
                    x: 3,
                    y: 3,
                },
            },
            sub: {
                lineWidth: 20,
                color: 0x34cfbe,
                alpha: 0.7,
            },
            shadow: {
                lineWidth: 30,
                color: 0x34cfbe,
                alpha: 0.3,
                offset: {
                    x: 3,
                    y: 3,
                },
            },
        },
    },
    buttonsConfig: {
        buttonPositionX: 137,
        buttonPositionY: 100,
        buttonOffsetX: 223,
        buttonOffsetY: 200,
    },
    linesPositions: [
        [new Point(30, 200), new Point(690, 200)],
        [new Point(30, 400), new Point(690, 400)],
        [new Point(248, 10), new Point(248, 590)],
        [new Point(471, 10), new Point(471, 590)],
    ],
    crossConfig: [
        [new Point(-75, -70), new Point(75, 70)],
        [new Point(-75, 70), new Point(75, -70)],
    ],
    circleConfig: {
        x: 0,
        y: 0,
        r: 70,
    },
    titlesConfig: {
        crossTextStyle: new TextStyle({
            fill: "0x00008b",
            fontSize: "28px",
            fontWeight: "bold",
            letterSpacing: 4,
            lineJoin: "round",
            strokeThickness: 6,
            fontFamily: "Verdana",
            dropShadowColor: "#ffffff",
            miterLimit: 0,
            stroke: "#ffffff",
        }),
        circleTextStyle: new TextStyle({
            fill: "0x8b0000",
            fontSize: "28px",
            fontWeight: "bold",
            letterSpacing: 4,
            lineJoin: "round",
            strokeThickness: 6,
            fontFamily: "Verdana",
            dropShadowColor: "#ffffff",
            miterLimit: 0,
            stroke: "#ffffff",
        }),
    },
    textCountConfig: {
        indicatorsOffset: -125,
        circleTitlePosition: new Point(740, 130),
        crossTitlePosition: new Point(740, 70),
        betLineIndicatorSpriteId: "betLine_selector",
    },
    spockOffset: { x: 102, y: 75 },
    newGameBtnConfig: {
        btnConfigs: { width: 54, height: 54, curTitle: "", backColor: 0x00675c, textSize: 50 },
        position: new Point(745, 500),
        textureId: "restartBtn",
    },
    tweens: {
        outDuration: 300,
        inDuration: 300,
    },
    winBackConfig: {
        size: {
            width: gameWidth,
            height: gameHeight,
        },
        position: new Point(gameWidth / 2, gameHeight / 2),
        color: 0xff8c00,
        opacity: 1,
    },
    winTitleConfig: {
        text: "YOU WIN",
        position: new Point(400, 250),
        textStyle: new TextStyle({
            fill: "#ffffff",
            fontSize: "68px",
            fontWeight: "bold",
            letterSpacing: 4,
            lineJoin: "round",
            strokeThickness: 6,
            fontFamily: "Verdana",
        }),
    },
    drawingOperations: {
        sub: {
            lineWidth: 6,
            color: 0xb7efff,
            alpha: 0.9,
        },
        main: {
            lineWidth: 2,
            color: 0xffffff,
        },
        shadow: {
            lineWidth: 10,
            color: 0xffffff,
            alpha: 0.3,
            offset: {
                x: 3,
                y: 3,
            },
        },
    },
};
