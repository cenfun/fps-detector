export interface FPSDetectorOption {
    width?: number;
    height?: number;
    fpsLevels?: number[];
    memLevels?: number[];
    colors?: string[];
    bgColor?: string;
    fgColor?: string;
    padding?: number;
}

export declare class FPSDetector {
    constructor($container: string | HTMLElement, option?: FPSDetectorOption);

    showMemory: boolean;
    list: number[];
    frames: number;
    startTime: number;
    stopped: boolean;

    render(): void;
    getFPSColor(v: number): string;
    getMEMColor(v: number): string;
    getImg(n: string, color: string): HTMLImageElement | undefined;
    start(): void;
    update(): void;
    count(): void;
    stop(): void;
}

export default FPSDetector;
