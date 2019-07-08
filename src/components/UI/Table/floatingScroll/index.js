/*
* @Author: docoder
* @Email:  docoder@163.com
*/
class FScroll {
    constructor(cont) {
        let inst = this;
        inst.cont = cont;
        let scrollBody = cont.closest('.fl-scrolls-body');
        if (scrollBody && scrollBody.length) {
            inst.scrollBody = scrollBody;
        }
        inst.sbar = inst.initScroll();
        inst.visible = true;
        inst.updateAPI(); // recalculate floating scrolls and hide those of them whose containers are out of sight
        inst.syncSbar(inst.cont);
        inst.addEventHandlers();
    }

    initScroll() {
        let flscroll = document.createElement('div');
        flscroll.classList.add('fl-scrolls');
        let { cont } = this;
        let newDiv = document.createElement('div');
        newDiv.style.width = `${cont.scrollWidth}px`;
        flscroll.appendChild(newDiv);
        return cont.appendChild(flscroll);
    }

    addEventHandlers() {
        let inst = this;
        let eventHandlers = (inst.eventHandlers = [{
                elem: inst.scrollBody || window,
                events: [{
                        name: 'scroll',
                        handler: () => {
                            inst.updateAPI();
                        },
                    },
                    {
                        name: 'resize',
                        handler: () => {
                            inst.updateAPI();
                        },
                    },
                ],
            },
            {
                elem: inst.sbar,
                events: [{
                    name: 'scroll',
                    handler: ({ target }) => {
                        inst.visible && inst.syncCont(target, true);
                    },
                }, ],
            },
            {
                elem: inst.cont,
                events: [{
                        name: 'scroll',
                        handler: ({ target }) => {
                            inst.syncSbar(target, true);
                        },
                    },
                    {
                        name: 'focusin',
                        handler: () => {
                            setTimeout(inst.syncSbar.bind(inst, inst.cont), 0);
                        },
                    },
                    {
                        name: 'update.fscroll',
                        handler: ({ namespace }) => {
                            // Check event namespace to ensure that this is not an extraneous event in a bubbling phase
                            if (namespace === 'fscroll') {
                                inst.updateAPI();
                            }
                        },
                    },
                    {
                        name: 'destroy.fscroll',
                        handler: ({ namespace }) => {
                            if (namespace === 'fscroll') {
                                inst.destroyAPI();
                            }
                        },
                    },
                ],
            },
        ]);
        eventHandlers.forEach(({ elem, events }) => {
            events.forEach(({ name, handler }) => {
                return elem.addEventListener(name, handler);
            });
        });
    }

    checkVisibility() {
        let inst = this;
        let mustHide = inst.sbar.scrollWidth <= inst.sbar.offsetWidth;
        if (!mustHide) {
            let contRect = inst.cont.getBoundingClientRect();
            let maxVisibleY = inst.scrollBody ?
                inst.scrollBody.getBoundingClientRect().bottom :
                window.innerHeight || document.documentElement.clientHeight;
            mustHide = contRect.bottom <= maxVisibleY || contRect.top > maxVisibleY;
        }
        if (inst.visible === mustHide) {
            inst.visible = !mustHide;
            // we cannot simply hide a floating scroll bar since its scrollLeft property will not update in that case
            inst.sbar.classList.toggle('fl-scrolls-hidden');
        }
    }

    syncCont(sender, preventSyncSbar) {
        let inst = this;
        // Prevents next syncSbar function from changing scroll position
        if (inst.preventSyncCont === true) {
            inst.preventSyncCont = false;
            return;
        }
        inst.preventSyncSbar = !!preventSyncSbar;
        inst.cont.scrollLeft = sender.scrollLeft;
    }

    syncSbar(sender, preventSyncCont) {
        let inst = this;
        // Prevents next syncCont function from changing scroll position
        if (inst.preventSyncSbar === true) {
            inst.preventSyncSbar = false;
            return;
        }
        inst.preventSyncCont = !!preventSyncCont;
        inst.sbar.scrollLeft = sender.scrollLeft;
    }

    // Compute outer width of an element with margin
    outerWidth(el) {
        let width = el.offsetWidth;
        const style = getComputedStyle(el);
        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        return width;
    }

    // Recalculate scroll width and container boundaries
    updateAPI() {
        let inst = this;
        let { cont } = inst;
        inst.sbar.style.width = `${inst.outerWidth(cont)}px`;
        if (!inst.scrollBody) {
            inst.sbar.style.left = `${cont.getBoundingClientRect().left}px`;
        }
        inst.checkVisibility(); // fixes issue #2
    }

    // Remove a scrollbar and all related event handlers
    destroyAPI() {
        this.eventHandlers.forEach(({ elem, events }) => {
            events.forEach(({ name, handler }) => {
                return elem.removeEventListener(name, handler);
            });
        });
        this.eventHandlers = null;
        this.sbar.parentNode.removeChild(this.sbar);
    }
}

export default function floatingScroll(els, method = 'init') {
    if (method === 'init') {
        Array.prototype.forEach.call(els, (el) => new FScroll(el));
    } else if (FScroll.prototype.hasOwnProperty(`${method}API`)) {
        this.dispatchEvent(new Event(`${method}.fscroll`));
    }
    return this;
}

