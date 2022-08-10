# fps-detector
> A tool to display FPS in real time for detecting JS performance.
# Install
```sh
npm i fps-detector
```

## Online Demo
[https://cenfun.github.io/fps-detector](https://cenfun.github.io/fps-detector)

## Usage
```js
import FPSDetector from 'fps-detector';
new FPSDetector('.fps-detector', {
    width: 120,
    height: 30
});
```
see [preview/index.html](preview/index.html)

## CDN Usage
```html
<script src="https://cdn.jsdelivr.net/npm/fps-detector@latest/dist/fps-detector.js"></script>

<div class="fps-detector"></div>
<script>
    const FPSDetector = window['fps-detector'].FPSDetector;
    new FPSDetector('.fps-detector');
</script> 
```

## Options
```js
new FPSDetector('.fps-detector', {
    width: 85,
    height: 30,

    fpsLevels: [10, 30],
    memLevels: [200, 100],
    colors: ['red', 'orange', 'green'],

    bgColor: '#fff',
    fgColor: '#ddd',
    padding: 1
});
```