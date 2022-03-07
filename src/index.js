class FPSDetector {
    constructor($container, option) {
        if (typeof $container === 'string') {
            $container = document.querySelector($container);
        }

        this.option = Object.assign({
            width: 85,
            height: 30,

            fpsLevels: [10, 30],
            memLevels: [200, 100],
            colors: ['red', 'orange', 'green'],

            bgColor: '#fff',
            fgColor: '#ddd',
            padding: 1
        }, option);

        const $canvas = document.createElement('canvas');
        $canvas.style.display = 'block';
        $canvas.setAttribute('width', this.option.width);
        $canvas.setAttribute('height', this.option.height);

        $container.appendChild($canvas);
        $container.title = 'FPS Detector';
        $container.onclick = (e) => {
            this.showMemory = !this.showMemory;
            this.render();
        };

        this.numbers = {
            '-': {
                'd': 'm2.615 8.485-.558-.431 1.116-.862h4.378l1.116.862-1.116.862H3.173l-.558-.431z'
            },
            '0': {
                'd': 'M9.435.638 7.711 2.29v.391l-.001.001v3.551l1.724 1.568V4.396l.001-.255V.639zM1.289 7.8l1.724-1.652v-.391h.001V2.206L1.29.638v3.404l-.001.255v3.502zm.492-7.849 1.652 1.724h.391l.001.001h3.551L8.944-.048H5.539l-.255-.001H1.782zm7.684 15.56-1.724-1.652v-.391H7.74V9.917l1.724-1.568v3.405l.001.255v3.502zM1.319 8.349l1.724 1.652v.391h.001v3.551L1.32 15.511v-3.404l-.001-.255V8.35zm.492 7.849 1.652-1.724h3.942l1.568 1.724H5.568l-.255.002H1.811z'
            },
            '1': {
                'd': 'M9.435.638 7.711 2.29v.391l-.001.001v3.551l1.724 1.568V4.396l.001-.255V.639zm.03 14.873-1.724-1.652v-.391H7.74V9.917l1.724-1.568v3.405l.001.255v3.502z'
            },
            '2': {
                'd': 'M9.435.638 7.711 2.29v.391l-.001.001v3.551l1.724 1.568V4.396l.001-.255V.639zM1.781-.049l1.652 1.724h.391l.001.001h3.551L8.944-.048H5.539l-.255-.001H1.782zm.834 8.534-.558-.431 1.116-.862h4.378l1.116.862-1.116.862H3.173l-.558-.431zm-1.296-.136 1.724 1.652v.391h.001v3.551L1.32 15.511v-3.404l-.001-.255V8.35zm.492 7.849 1.652-1.724h3.942l1.568 1.724H5.568l-.255.002H1.811z'
            },
            '3': {
                'd': 'M9.435.638 7.711 2.29v.391l-.001.001v3.551l1.724 1.568V4.396l.001-.255V.639zM1.781-.049l1.652 1.724h.391l.001.001h3.551L8.944-.048H5.539l-.255-.001H1.782zm.834 8.534-.558-.431 1.116-.862h4.378l1.116.862-1.116.862H3.173l-.558-.431zm6.85 7.026-1.724-1.652v-.391H7.74V9.917l1.724-1.568v3.405l.001.255v3.502zm-7.654.687 1.652-1.724h3.942l1.568 1.724H5.568l-.255.002H1.811z'
            },
            '4': {
                'd': 'M9.435.638 7.711 2.29v.391l-.001.001v3.551l1.724 1.568V4.396l.001-.255V.639zM1.289 7.8l1.724-1.652v-.391h.001V2.206L1.29.638v3.404l-.001.255v3.502zm1.326.685-.558-.431 1.116-.862h4.378l1.116.862-1.116.862H3.173l-.558-.431zm6.85 7.026-1.724-1.652v-.391H7.74V9.917l1.724-1.568v3.405l.001.255v3.502z'
            },
            '5': {
                'd': 'm1.289 7.8 1.724-1.652v-.391h.001V2.206L1.29.638v3.404l-.001.255v3.502zm.492-7.849 1.652 1.724h.391l.001.001h3.551L8.944-.048H5.539l-.255-.001H1.782zm.834 8.534-.558-.431 1.116-.862h4.378l1.116.862-1.116.862H3.173l-.558-.431zm6.85 7.026-1.724-1.652v-.391H7.74V9.917l1.724-1.568v3.405l.001.255v3.502zm-7.654.687 1.652-1.724h3.942l1.568 1.724H5.568l-.255.002H1.811z'
            },
            '6': {
                'd': 'm1.289 7.8 1.724-1.652v-.391h.001V2.206L1.29.638v3.404l-.001.255v3.502zm.492-7.849 1.652 1.724h.391l.001.001h3.551L8.944-.048H5.539l-.255-.001H1.782zm.834 8.534-.558-.431 1.116-.862h4.378l1.116.862-1.116.862H3.173l-.558-.431zm6.85 7.026-1.724-1.652v-.391H7.74V9.917l1.724-1.568v3.405l.001.255v3.502zM1.319 8.349l1.724 1.652v.391h.001v3.551L1.32 15.511v-3.404l-.001-.255V8.35zm.492 7.849 1.652-1.724h3.942l1.568 1.724H5.568l-.255.002H1.811z'
            },
            '7': {
                'd': 'M9.435.638 7.711 2.29v.391l-.001.001v3.551l1.724 1.568V4.396l.001-.255V.639zM1.781-.049l1.652 1.724h.391l.001.001h3.551L8.944-.048H5.539l-.255-.001H1.782zm7.684 15.56-1.724-1.652v-.391H7.74V9.917l1.724-1.568v3.405l.001.255v3.502z'
            },
            '8': {
                'd': 'M9.435.638 7.711 2.29v.391l-.001.001v3.551l1.724 1.568V4.396l.001-.255V.639zM1.289 7.8l1.724-1.652v-.391h.001V2.206L1.29.638v3.404l-.001.255v3.502zm.492-7.849 1.652 1.724h.391l.001.001h3.551L8.944-.048H5.539l-.255-.001H1.782zm.834 8.534-.558-.431 1.116-.862h4.378l1.116.862-1.116.862H3.173l-.558-.431zm6.85 7.026-1.724-1.652v-.391H7.74V9.917l1.724-1.568v3.405l.001.255v3.502zM1.319 8.349l1.724 1.652v.391h.001v3.551L1.32 15.511v-3.404l-.001-.255V8.35zm.492 7.849 1.652-1.724h3.942l1.568 1.724H5.568l-.255.002H1.811z'
            },
            '9': {
                'd': 'M9.435.638 7.711 2.29v.391l-.001.001v3.551l1.724 1.568V4.396l.001-.255V.639zM1.289 7.8l1.724-1.652v-.391h.001V2.206L1.29.638v3.404l-.001.255v3.502zm.492-7.849 1.652 1.724h.391l.001.001h3.551L8.944-.048H5.539l-.255-.001H1.782zm.834 8.534-.558-.431 1.116-.862h4.378l1.116.862-1.116.862H3.173l-.558-.431zm6.85 7.026-1.724-1.652v-.391H7.74V9.917l1.724-1.568v3.405l.001.255v3.502z'
            }
        };
        this.initNumbers($canvas);

        this.ctx = $canvas.getContext('2d');
        
        this.start();

    }

    render() {

        const w = this.option.width;
        const h = this.option.height;
        const ctx = this.ctx;
        const list = this.list;

        const iw = 11;
        const ih = 16;

        const padding = this.option.padding;

        const lx = padding;
        const ly = padding;
        const lw = w - (iw * 2 + padding * 3);
        const lh = h - padding * 2;

        let startIndex = padding;
        if (list.length > lw) {
            list.length = lw;
        } else {
            startIndex = padding + (lw - list.length);
        }

        //console.log(list);

        ctx.fillStyle = this.option.bgColor;
        ctx.fillRect(0, 0, w, h);

        if (this.showMemory) {

            const memory = window.performance.memory;
            const mem = memory.usedJSHeapSize / 1048576;
            //const memTotal = memory.jsHeapSizeLimit / 1048576;
            //const per = (mem / memTotal * 100).toFixed(2);
    
            //console.log(mem, per);
            ctx.font = 'Bold 16px';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = this.getMEMColor(mem);
            ctx.fillText(`MEM ${mem.toFixed(1)} MB`, w / 2, Math.ceil(h / 2) + 1);

            return;
        }

        ctx.fillStyle = this.option.fgColor;
        ctx.fillRect(lx, ly, lw, lh);

        const ls = [].concat(list).reverse();

        let lastItem;
        let lastColor;
        ls.forEach((item, i) => {
            lastItem = item;
            const color = this.getFPSColor(item);
            lastColor = color;
            ctx.fillStyle = color;
            const ch = Math.max(Math.floor(item / 60 * lh), 1);
            ctx.fillRect(startIndex + i, lh + ly - ch, 1, ch);
        });

        const str = `${lastItem}`.padStart(2, '0');
        
        const x = Math.floor(lx + lw + padding);
        const y = Math.ceil((h - ih) / 2);

        str.split('').forEach((s, i) => {
            const img = this.getImg(s, lastColor);
            if (img) {
                ctx.drawImage(img, x + i * iw, y);
            }
        });

    }

    //asc
    getFPSColor(v) {
        const colors = this.option.colors;
        const fpsLevels = this.option.fpsLevels;
        let i;
        for (i = 0; i < fpsLevels.length; i++) {
            const item = fpsLevels[i];
            if (v < item) {
                return colors[i];
            }
        }
        return colors[i];
    }

    //desc
    getMEMColor(v) {
        const colors = this.option.colors;
        const memLevels = this.option.memLevels;
        let i;
        for (i = 0; i < memLevels.length; i++) {
            const item = memLevels[i];
            if (v > item) {
                return colors[i];
            }
        }
        return colors[i];
    }

    initNumbers($container) {
        const numbers = this.numbers;
        const colors = this.option.colors;
        Object.keys(numbers).forEach(key => {
            const item = numbers[key];
            colors.forEach(color => {
                if (item[color]) {
                    return;
                }
                const svg = `
                <svg viewBox="0 0 11 16" width="11" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path fill="${color}" d="${item.d}" />
                </svg>
                `;
                const $img = document.createElement('img');
                $img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
                $container.appendChild($img);
                item[color] = $img;
            });
        });
    }

    getImg(n, color) {
        const item = this.numbers[n];
        if (item) {
            return item[color];
        }
    }

    start() {
        this.stopped = false;
        this.list = [];
        this.frames = 0;
        this.startTime = window.performance.now();
        this.update();
    }

    update() {
        if (this.stopped) {
            return;
        }
        window.requestAnimationFrame(() => {
            this.count();
        });
    }

    count() {

        const list = this.list;

        const now = window.performance.now();
        let d = now - this.startTime;
        //count each 1s
        if (d < 1000) {
            this.frames += 1;
        } else {

            d -= 1000;
            while (d > 1000) {
                list.unshift(0);
                d -= 1000;
            }

            //1s
            list.unshift(this.frames);
            this.render();
            //next
            this.frames = 1;
            this.startTime = now - d;
        }
       
        this.update();
    }

    stop() {
        this.stopped = true;
    }

}

export { FPSDetector };

export default FPSDetector;