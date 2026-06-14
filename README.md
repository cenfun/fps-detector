# fps-detector
> A tool to display FPS in real time for detecting JS performance.

## Install
```sh
npm i fps-detector
```

## Online Demo
[https://cenfun.github.io/fps-detector](https://cenfun.github.io/fps-detector)

## Usage

### ESM
```js
import FPSDetector from 'fps-detector';
// or named import
// import { FPSDetector } from 'fps-detector';

new FPSDetector('.fps-detector', {
    width: 120,
    height: 30
});
```

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/fps-detector@latest/dist/fps-detector.js"></script>

<div class="fps-detector"></div>
<script>
    const FPSDetector = window['fps-detector'].FPSDetector;
    new FPSDetector('.fps-detector');
</script>
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | `number` | `85` | Canvas width |
| `height` | `number` | `30` | Canvas height |
| `fpsLevels` | `number[]` | `[10, 30]` | FPS thresholds (ascending), values below threshold use corresponding color |
| `memLevels` | `number[]` | `[200, 100]` | Memory thresholds in MB (descending), values above threshold use corresponding color |
| `colors` | `string[]` | `['red', 'orange', 'green']` | Colors for each level (low to high performance) |
| `bgColor` | `string` | `'#fff'` | Background color |
| `fgColor` | `string` | `'#ddd'` | Foreground (chart area) color |
| `padding` | `number` | `1` | Canvas padding |

## Methods

| Method | Description |
|--------|-------------|
| `start()` | Start/resume FPS monitoring |
| `stop()` | Stop FPS monitoring |
| `render()` | Manually trigger a re-render |

## Features

- **Click to toggle**: Click the detector to switch between FPS and Memory display mode
- **Memory display**: Shows used JS heap size in MB (Chrome only, requires `window.performance.memory`)
- **Color-coded levels**: FPS and memory values are color-coded based on configured thresholds
- **Real-time bar chart**: Visualizes FPS history as a scrolling bar chart

see [index.html](index.html) for a complete example.
