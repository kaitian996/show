var Show = (function (exports) {
    'use strict';

    class Show {
        constructor(selector = 'show', enterClass = 'animate__animated animate__flash', leaveClass = 'animate__animated animate__swing', options) {
            this.options = {
                root: undefined,
                rootMargin: '0px',
                threshold: 0
            };
            this.isFlushing = false;
            this.container = document.querySelectorAll(`.${selector}`);
            this.enterClass = enterClass;
            this.leaveClass = leaveClass;
            if (options)
                this.options = options;
            //observer
            this.observer = new IntersectionObserver((entries) => {
                console.log('触发回调', entries[0].intersectionRatio, this.isFlushing);
                entries.forEach((entry) => {
                    this.watch(entry);
                    console.log('结束');
                });
            }, this.options);
            //observe
            this.container.forEach(element => this.observer.observe(element));
        }
        watch(element) {
            const target = element.target;
            //判断是否进入
            if (element.intersectionRatio > 0) {
                this.addClass(target);
                console.log('添加class');
            }
            else if (element.intersectionRatio <= 0) {
                this.removeClass();
                console.log('移除class');
            }
        }
        addClass(target) {
            if (target.dataset['enter']) {
                target.dataset['enter'].split(' ').forEach((css) => {
                    target.classList.add(css);
                });
            }
            else {
                this.enterClass.split(' ').forEach((css) => {
                    target.classList.add(css);
                });
            }
        }
        removeClass() {
            this.container.forEach((target) => {
                if (target.dataset['enter']) {
                    target.dataset['enter'].split(' ').forEach((css) => {
                        target.classList.remove(css);
                    });
                }
                else {
                    this.enterClass.split(' ').forEach((css) => {
                        target.classList.remove(css);
                    });
                }
            });
            console.log('移除class');
        }
        //元素监视
        listen(options) {
            // const target = document.querySelectorAll(`.${options.selector}`)
            let target;
            if (typeof options.selector === 'string') {
                target = document.querySelectorAll(`.${options.selector}`);
            }
            else {
                target = options.selector;
            }
            const callback = options.callback;
            const observerOptions = {
                root: options.root || undefined,
                rootMargin: options.rootMargin || '0px',
                threshold: options.threshold || 0
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        console.log(entry.intersectionRatio);
                        callback && callback();
                    }
                });
            }, observerOptions);
            target.forEach(item => observer.observe(item));
        }
    }

    exports.Show = Show;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
//# sourceMappingURL=show.global.js.map
