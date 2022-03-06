class FPSMonitor {
    constructor($container) {
        if (typeof $container === 'string') {
            $container = document.querySelector($container);
        }
        const rect = $container.getBoundingClientRect();

        this.width = Math.round(rect.width);
        this.height = Math.round(rect.height);

        const $canvas = document.createElement('canvas');
        $canvas.setAttribute('width', this.width);
        $canvas.setAttribute('height', this.height);
        $canvas.setAttribute('title', 'FPS');
        $container.appendChild($canvas);

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
        this.initNumbers($container);

        this.ctx = $canvas.getContext('2d');
        this.list = [];
        this.frames = 0;
        this.startTime = window.performance.now();
        
        this.start();

    }

    render() {

        const w = this.width;
        const h = this.height;
        const ctx = this.ctx;
        const list = this.list;

        const iw = 11;
        const ih = 16;

        const lx = 1;
        const ly = 1;
        const lw = w - iw * 2 - 3;
        const lh = h - 2;

        let start = 1;
        if (list.length > lw) {
            list.length = lw;
        } else {
            start = lw - list.length + 1;
        }

        //console.log(list);
        
        ctx.fillStyle = '#fff';
        //ctx.globalAlpha = 1;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#ddd';
        ctx.fillRect(lx, ly, lw, lh);

        const ls = [].concat(list).reverse();

        let lastItem;
        let lastColor;
        ls.forEach((item, i) => {
            lastItem = item;
            let color = 'green';
            if (item < 10) {
                color = 'red';
            } else if (item < 24) {
                color = 'orange';
            }
            lastColor = color;
            ctx.fillStyle = color;
            const ch = Math.floor(item / 60 * lh);
            ctx.fillRect(start + i, lh + ly - ch, 1, ch);
        });


        let str = `${lastItem}`;
        if (str.length < 2) {
            str = `0${str}`;
        }

        const x = Math.floor(w - iw * 2 - 1);
        const y = Math.ceil((h - ih) / 2);

        str.split('').forEach((s, i) => {
            const img = this.getImg(s, lastColor);
            if (img) {
                ctx.drawImage(img, x + i * iw, y);
            }
        });

    }

    initNumbers($container) {
        const $div = document.createElement('div');
        $div.style.cssText = 'position:absolute;top:0;left:0;display:none;';
        $container.appendChild($div);
        $container.style.position = 'relative';
        const numbers = this.numbers;
        const colors = ['red', 'orange', 'green'];
        Object.keys(numbers).forEach(key => {
            const item = numbers[key];
            colors.forEach(color => {
                const svg = `
                <svg viewBox="0 0 11 16" width="11" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path fill="${color}" d="${item.d}" />
                </svg>
                `;
                const $img = document.createElement('img');
                $img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
                $div.appendChild($img);
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
       
        this.start();
    }

}

export { FPSMonitor };

export default FPSMonitor;