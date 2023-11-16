/* eslint-disable prettier/prettier */

import { Container, Graphics, Sprite, Point } from "pixi.js";
import { PixiApp } from "../../module/PixiApp";
import { ticTacToeSpockConfigs, gameWidth, gameHeight } from "./TicTacToeSpockSettings";
import { Cell } from "../../components/Cell";
import { ColorPlane } from "../../components/ColorPlane";
import { NumberText } from "../../components/NumberText";
import { drawLines, getRandomBool, checkIfNumbersAreEqual, createNewMatrix, winLines } from "../../utils/utils";
import { SimpleButton } from "../../components/SimpleButton";
import { WinningSituation } from "../../components/WinningSituation";

interface IsWinConfig {
    result: boolean;
    winSymbolIndexArr: number[];
}

export class TicTacToeSpock extends Container {
    private canvas = new Graphics();
    private curPlayer = 0;
    private allPositionsMatrix: number[][] = [];
    private allButtons: Cell[] = [];
    private crossValue = 0;
    private circleValue = 0;
    private crossTitle!: NumberText;
    private circleTitle!: NumberText;
    private winBack!: WinningSituation;
    private lineGr = new Graphics();
    private winResult = false;
    private btnPositions: Point[] = [];
    private spockSprite!: Sprite;

    constructor() {
        super();
        const mainBack = new ColorPlane({ size: { width: gameWidth, height: gameHeight }, color: 0x5dcfc3 });
        mainBack.position.set(gameWidth / 2, gameHeight / 2);
        this.addChild(mainBack);
        this.createTextLabels();
        this.setup();
        this.restart();
    }

    setup() {
        const {
            linesSettings,
            linesPositions,
            newGameBtnConfig,
            colsRowsSize: { size },
            winBackConfig,
            winTitleConfig,
        } = ticTacToeSpockConfigs;

        this.allPositionsMatrix = createNewMatrix(size);
        this.winBack = new WinningSituation({ winBackConfig, winTitleConfig });
        this.createPlayButons();
        // New game button
        const newGameButton = new SimpleButton({
            onClick: () => {
                this.restart();
            },
            texture: PixiApp.getTexture(newGameBtnConfig.textureId),
            ...newGameBtnConfig.btnConfigs,
        });
        newGameButton.position.copyFrom(newGameBtnConfig.position);

        this.spockSprite = new Sprite(PixiApp.getTexture("spock"));
        this.spockSprite.visible = false;
        this.addChild(this.canvas, newGameButton, this.lineGr, this.spockSprite, this.winBack);

        drawLines(this.canvas, linesPositions, linesSettings.lineConfig.main);
    }

    createTextLabels() {
        const { textCountConfig, titlesConfig } = ticTacToeSpockConfigs;
        const { circleTitlePosition, crossTitlePosition } = textCountConfig;

        this.crossTitle = new NumberText(titlesConfig.crossTextStyle);
        this.circleTitle = new NumberText(titlesConfig.circleTextStyle);

        this.crossTitle.position.copyFrom(crossTitlePosition);
        this.circleTitle.position.copyFrom(circleTitlePosition);

        this.setCrossValue(0);
        this.setCircleValue(0);

        this.addChild(this.crossTitle, this.circleTitle);
    }

    createPlayButons() {
        const {
            btnConfig,
            buttonsConfig: { buttonPositionX, buttonPositionY, buttonOffsetX, buttonOffsetY },
            colsRowsSize: { size },
        } = ticTacToeSpockConfigs;

        for (let i = 0; i < size; i++) {
            for (let k = 0; k < size; k++) {
                const position = new Point(buttonPositionX + buttonOffsetX * k, buttonPositionY + buttonOffsetY * i);
                this.btnPositions.push(position);
            }
        }

        this.btnPositions.forEach((position, index) => {
            const btnContainer = new Container();
            btnContainer.position.copyFrom(position);
            //Button area
            const button: Cell = new Cell({
                ...btnConfig,
                onClick: () => this.onClick(button, index),
            });
            this.allButtons.push(button);

            btnContainer.addChild(button);
            this.addChild(btnContainer);
        });
    }

    async onClick(button: Cell, index: number) {
        const {
            linesSettings,
            crossConfig,
            circleConfig,
            playerOneConfigs,
            playerTwoConfigs,
            colsRowsSize: { size },
            tweens: { outDuration, inDuration },
        } = ticTacToeSpockConfigs;

        const workerPlayer = this.curPlayer;
        this.curPlayer = this.curPlayer === 0 ? 1 : 0;
        this.playBtnStatus(this.allPositionsMatrix, size, false);
        // Writing to the Matrix
        const reelIndex = index % size;
        const symbolIndex = (index - reelIndex) / size;
        this.allPositionsMatrix[reelIndex][symbolIndex] = this.curPlayer;
        // Win situation
        this.checkWin(this.allPositionsMatrix, size, workerPlayer);

        await button.animateOut(outDuration);
        button.setTitle("");

        if (workerPlayer === 0) {
            button.setBackColor(playerOneConfigs.color);
            // Spock
            if (getRandomBool(0.1)) {
                this.getSpock(this.btnPositions[index]);
                this.stopGame(workerPlayer);
            } else {
                button.setCircle({ config: circleConfig, main: linesSettings.lineConfig.main });
                this.circleValue++;
                this.setCircleValue(this.circleValue);
                if (!this.winResult) {
                    this.playBtnStatus(this.allPositionsMatrix, size, true);
                }
            }
        } else {
            button.setBackColor(playerTwoConfigs.color);
            // Spock
            if (getRandomBool(0.1)) {
                this.getSpock(this.btnPositions[index]);
                this.stopGame(workerPlayer);
            } else {
                button.setCross({ config: crossConfig, main: linesSettings.lineConfig.main });
                this.crossValue++;
                this.setCrossValue(this.crossValue);
                if (!this.winResult) {
                    this.playBtnStatus(this.allPositionsMatrix, size, true);
                }
            }
        }

        await button.animateIn(inDuration);
    }

    restart() {
        const {
            btnConfig,
            colsRowsSize: { size },
            tweens: { outDuration, inDuration },
        } = ticTacToeSpockConfigs;

        this.allPositionsMatrix = createNewMatrix(size);
        this.spockSprite.visible = false;
        this.allButtons.forEach(async (btn) => {
            btn.cleaningGraphs();
            await btn.animateOut(outDuration);
            btn.setTitle(btnConfig.curTitle);
            btn.setBackColor(btnConfig.backColor);
            await btn.animateIn(inDuration);
            btn.interactive = true;
        });
        this.crossValue = 0;
        this.circleValue = 0;
        this.setCircleValue(0);
        this.setCrossValue(0);
        this.lineGr.clear();
    }

    setCrossValue(value: number) {
        this.crossTitle.text = `X : ${value}`;
    }

    setCircleValue(value: number) {
        this.circleTitle.text = `O : ${value}`;
    }

    // Logics
    isWin(matrix: number[][], linesCount: number): IsWinConfig {
        const ray = (x: number, y: number, oX: number, oY: number, amount: number) => {
            const line: number[] = [];
            const btnIndex: number[] = [];
            for (let i = 0; i < amount; i++) {
                const value = getValue(x, y, oX * i, oY * i);
                if (value != -1 && value === this.curPlayer) {
                    line.push(value);
                    btnIndex.push((y + oY * i) * amount + (x + oX * i));
                }
            }
            return { line, btnIndex };
        };

        const getValue = (sX: number, sY: number, oX: number, oY: number): number => {
            return matrix[sX + oX] != undefined && matrix[sX + oX][sY + oY] != undefined
                ? matrix[sX + oX][sY + oY]
                : -1;
        };

        for (let x = 0; x < matrix.length; x++) {
            for (let y = 0; y < matrix[x].length; y++) {
                for (let oX = -1; oX <= 1; oX++) {
                    for (let oY = -1; oY <= 1; oY++) {
                        if (!(oX === 0 && oY === 0)) {
                            const lineSymbols = ray(x, y, oX, oY, linesCount);
                            if (lineSymbols.line.length === linesCount && checkIfNumbersAreEqual(lineSymbols.line)) {
                                return {
                                    result: true,
                                    winSymbolIndexArr: lineSymbols.btnIndex,
                                };
                            }
                        }
                    }
                }
            }
        }
        return { result: false, winSymbolIndexArr: [] };
    }

    // Processing the results
    checkWin(matrix: number[][], linesCount: number, workerPlayer: number) {
        const { linesSettings } = ticTacToeSpockConfigs;
        const winResult = this.isWin(matrix, linesCount);

        if (winResult.result) {
            this.stopGame(workerPlayer);
            const winSymbolsPositions: Point[][] = [];

            for (let i = 0; i < winResult.winSymbolIndexArr.length - 1; i++) {
                winSymbolsPositions.push([
                    this.btnPositions[winResult.winSymbolIndexArr[i]],
                    this.btnPositions[winResult.winSymbolIndexArr[i + 1]],
                ]);
            }
            winLines({
                positions: winSymbolsPositions,
                line: this.lineGr,
                lineConfig: linesSettings.lineConfig,
            });
        }
        this.winResult = winResult.result;
    }

    stopGame(player: number) {
        const {
            tweens: { outDuration, inDuration },
        } = ticTacToeSpockConfigs;
        this.allButtons.forEach((btn) => {
            btn.interactive = false;
        });
        this.winBack.animate(outDuration, inDuration).then(() => {
            console.log("🏁 Player ", player === 0 ? "Blue " : "Red", " 🏆 WIN 🏆");
        });
    }

    // Toggle button interactivity
    playBtnStatus(matrix: number[][], lineCount: number, status: boolean) {
        for (let i = 0; i < lineCount; i++) {
            for (let k = 0; k < lineCount; k++) {
                if (matrix[k][i] === -1) {
                    this.allButtons[i * lineCount + k].interactive = status;
                }
            }
        }
    }

    getSpock(position: Point) {
        const { x, y } = ticTacToeSpockConfigs.spockOffset;
        this.spockSprite.position.set(position.x - x, position.y - y);
        this.spockSprite.visible = true;
    }
}
