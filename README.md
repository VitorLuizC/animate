# `@vitorluizc/animate`

[![Build Status](https://travis-ci.org/VitorLuizC/animate.svg?branch=master)](https://travis-ci.org/VitorLuizC/animate)
![License](https://badgen.net/github/license/VitorLuizC/animate)
[![Library minified size](https://badgen.net/bundlephobia/min/@vitorluizc/animate)](https://bundlephobia.com/result?p=@vitorluizc/animate)
[![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/@vitorluizc/animate)](https://bundlephobia.com/result?p=@vitorluizc/animate)

[![Animate bubbles example GIF](https://user-images.githubusercontent.com/9027363/50610043-b251fe00-0eb8-11e9-9df4-f98da8c3beb0.gif)](https://codepen.io/VitorLuizC/full/WLddER)

Create and manage animation functions with AnimationFrame API.

- :zap: Dependency free and smaller than **170B** (ESM minified + gzipped);
- :label: Type definitions to TS developers and IDE/Editors intellisense;
- :package: CommonJS, ESM and UMD distributions (_CDN uses UMD as default_);

#### See bubbles example at [Codepen](https://codepen.io/VitorLuizC/full/WLddER)

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install @vitorluizc/animate --save

# For Yarn, use the command below.
yarn add @vitorluizc/animate
```

### Installation from CDN

This module has an UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<script src="https://cdn.jsdelivr.net/npm/@vitorluizc/animate"></script>

<script>
  // module will be available through `animate` function.

  var animation = animate(function () {
    // ...
  });

  animation.start();
</script>
```

## Usage

Call `animate`, the default exported function, with your callback and use returned object to manage your animation.

```js
import animate from '@vitorluizc/animate';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const position = { x: 0, y : 0 };

const animation = animate(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(position.x, position.y, 100 / 2, 0, 2 * Math.PI);
  context.fillStyle = '#000000';
  context.fill();
  context.closePath();
});

window.addEventListener('mousemove', (event) => {
  position.x = event.clientX;
  position.y = event.clientY;
});

animation.start();
```

> See this example on [Codepen](https://codepen.io/VitorLuizC/pen/jXRzVp).

## API

- **`animate`**

  The default exported function, which receives `callback` as argument and returns an **`Animation`**.

  - `callback` is a **synchronous function** running into a AnimationFrame recursion.

  ```js
  let count = 0;

  const animation = animate(() => {
    context.clearRect(0, 0, element.width, element.height);
    context.font = "4rem monospace";
    context.textAlign = 'center';
    context.fillText(count, element.width / 2, element.height / 2);

    count++;
  });

  animation.start();
  ```

  > See this example on [Codepen](https://codepen.io/VitorLuizC/pen/yGrvzP).

  <details>
    <summary>TypeScript type definitions.</summary>

  <br />

  ```ts
  export default function animate(callback: () => void): Animation;
  ```
  </details>

- **`Animation`**

  An object returned by **`animate`** function to manage your animations. It can start, stop and check if animation is running.

  - **`running`**: A getter property that indicates if animation is running.

  - **`start()`**: A method to start the animation.

  - **`stop()`**: A method to stop the animation.

  ```js
  const animation = animate(() => { ... });

  animation.start();

  // Stops the animation after 10s
  setTimeout(() => animation.stop(), 10 * 1000);

  if (animation.running)
    console.log('The animation is running...');
  ```

  <details>
    <summary>TypeScript type definitions.</summary>

  <br />

  ```ts
  export interface Animation {
    readonly running: boolean;
    stop: () => void;
    start: () => void;
  }
  ```
  </details>

## License

Released under [MIT License](./LICENSE).
