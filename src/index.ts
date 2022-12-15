export class Show {
    private observer: IntersectionObserver
    private container: NodeListOf<Element>
    private options: IntersectionObserverInit = {
        root: undefined,
        rootMargin: '0px',
        threshold: 0
    }
    private enterClass: string
    private leaveClass: string
    private isFlushing: boolean = false
    constructor(selector: string = 'show', enterClass: string = 'animate__animated animate__flash', leaveClass: string = 'animate__animated animate__swing', options?: IntersectionObserverInit) {
        this.container = document.querySelectorAll(`.${selector}`)
        this.enterClass = enterClass
        this.leaveClass = leaveClass
        if (options) this.options = options
        //observer
        this.observer = new IntersectionObserver((entries) => {
            console.log('触发回调', entries[0].intersectionRatio, this.isFlushing)
            entries.forEach((entry) => {
                this.watch(entry)
                console.log('结束')
            })
        }, this.options)
        //observe
        this.container.forEach(element => this.observer.observe(element))
    }
    private watch(element: IntersectionObserverEntry) {
        const target = element.target as HTMLElement
        //判断是否进入
        if (element.intersectionRatio > 0) {
            this.addClass(target)
            console.log('添加class');
        } else if (element.intersectionRatio <= 0) {
            this.removeClass()
            console.log('移除class');
        }
    }
    private addClass(target: HTMLElement) {
        if (target.dataset['enter']) {
            target.dataset['enter'].split(' ').forEach((css) => {
                target.classList.add(css)
            })
        } else {
            this.enterClass.split(' ').forEach((css) => {
                target.classList.add(css)
            })
        }
    }
    private removeClass() {
        (this.container as unknown as HTMLElement[]).forEach((target) => {
            if (target.dataset['enter']) {
                target.dataset['enter'].split(' ').forEach((css) => {
                    target.classList.remove(css)
                })
            } else {
                this.enterClass.split(' ').forEach((css) => {
                    target.classList.remove(css)
                })
            }
        })
        console.log('移除class');

    }
    //元素监视
    public listen(options: IntersectionObserverInit & { selector: string | Element[]; callback?: Function }) {
        let target: NodeListOf<Element> | Element[]
        if (typeof options.selector === 'string') {
            target = document.querySelectorAll(`.${options.selector}`)
        } else {
            target = options.selector
        }
        const callback = options.callback
        const observerOptions = {
            root: options.root || undefined,
            rootMargin: options.rootMargin || '0px',
            threshold: options.threshold || 0
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    console.log(entry.intersectionRatio)
                    callback && callback()
                }
            })
        }, observerOptions)
        target.forEach(item => observer.observe(item))
    }
}

