export declare class Show {
    private observer;
    private container;
    private options;
    private enterClass;
    private leaveClass;
    private isFlushing;
    constructor(selector?: string, enterClass?: string, leaveClass?: string, options?: IntersectionObserverInit);
    private watch;
    private addClass;
    private removeClass;
    listen(options: IntersectionObserverInit & {
        selector: string | Element[];
        callback?: Function;
    }): void;
}
