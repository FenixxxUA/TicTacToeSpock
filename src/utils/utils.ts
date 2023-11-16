import { Graphics, Point, LINE_CAP } from "pixi.js";

interface lineConfigs {
    lineWidth: number;
    color: number;
    alpha: number;
    offset: {
        x: number;
        y: number;
    };
}
interface circleConfigs {
    x: number;
    y: number;
    r: number;
}

interface WinLinesConfig {
    positions: Point[][];
    line: Graphics;
    lineConfig: {
        winMain: {
            lineWidth: number;
            color: number;
            alpha: number;
            offset: {
                x: number;
                y: number;
            };
        };
        sub: {
            lineWidth: number;
            color: number;
            alpha: number;
        };
        shadow: {
            lineWidth: number;
            color: number;
            alpha: number;
            offset: {
                x: number;
                y: number;
            };
        };
    };
}

export function drawLines(canvas: Graphics, positionsArr: Point[][], configs: lineConfigs) {
    canvas.clear();
    const gr = canvas;

    gr.lineStyle({
        width: configs.lineWidth,
        color: configs.color,
        alpha: configs.alpha,
        cap: LINE_CAP.ROUND,
    });

    positionsArr.forEach(([{ x, y }, ...elements]) => {
        gr.moveTo(x, y);
        elements.forEach((pos) => {
            gr.lineTo(pos.x, pos.y);
        });
    });
}
export function drawCircle(canvas: Graphics, configs: circleConfigs, style: lineConfigs) {
    canvas.clear();
    const { x, y, r } = configs;
    const gr = canvas;

    gr.lineStyle({
        width: style.lineWidth,
        color: style.color,
    });
    gr.drawCircle(x, y, r);
}

export function getRandomBool(limit = 0.5): boolean {
    return Math.random() < limit;
}

export function checkIfNumbersAreEqual(arr: number[]): boolean {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[0] === arr[i]) {
            count++;
        }
    }
    return count === arr.length;
}

export function createNewMatrix(size: number, initValue = -1): number[][] {
    const matrix: number[][] = [];
    for (let i = 0; i < size; i++) {
        const row: number[] = [];
        for (let k = 0; k < size; k++) {
            row.push(initValue);
        }
        matrix.push(row);
    }
    return matrix;
}

export function winLines({ positions, line, lineConfig }: WinLinesConfig) {
    const { winMain, sub, shadow } = lineConfig;
    const drawWinLines = () => {
        positions.forEach(([{ x, y }, ...elements]) => {
            line.moveTo(x, y);
            elements.forEach((pos) => {
                line.lineTo(pos.x, pos.y);
            });
        });
    };
    // shadow
    line.lineStyle({
        width: shadow.lineWidth,
        color: shadow.color,
        alpha: shadow.alpha,
        cap: LINE_CAP.ROUND,
    });
    drawWinLines();
    //  sub
    line.lineStyle({
        width: sub.lineWidth,
        color: sub.color,
        alpha: sub.alpha,
        cap: LINE_CAP.ROUND,
    });
    drawWinLines();
    // main
    line.lineStyle({
        width: winMain.lineWidth,
        color: winMain.color,
        cap: LINE_CAP.ROUND,
    });
    drawWinLines();
}
