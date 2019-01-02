# `@vitorluizc/animate`

Create and manage animation functions with AnimationFrame API and a state.

- :zap: Dependency free and smaller than **170B** (minified + gzipped);
- :label: Type definitions to TS developers and IDE/Editors intellisense;
- :package: CommonJS, ESM and UMD distributions (_CDN uses UMD as default_);

## Usage

Call `animate`, the default exported function, with your animation function as argument.

```js
import animate from '@vitorluizc/animate';

// ...

const INITIAL_STATE = { count: 0 };

const animation = animate(({ count } = INITIAL_STATE) => {
  if (count === 1000)
    return animation.stop();

  context.clearRect(0, 0, width, height);
  context.textAlign = "center";
  context.fillText(~~count, width / 2, height / 2);
  return { count: count + 0.25 };
});

animation.start();
```

## API

- **`animate`**

  The default exported function, which receives an _animation function_ as argument and returns an **`Animation`**.

  - The _animation function_ is a synchronous function running into a AnimationFrame recursion that receives state as argument and return it to next function.

  ```js
  const INITIAL_STATE = 0;

  const animation = animate((state = INITIAL_STATE) => {
    if (state === 1000)
      return animation.stop();

    context.clearRect(0, 0, element.width, element.height);
    context.textAlign = "center";
    context.fillText(state, element.width / 2, element.height / 2);
    return state + 1;
  });
  ```

  <details>
    <summary>TypeScript type definitions.</summary>

  <br />

  ```ts
  declare const animate: <S>(animation: (state: S | undefined) => S) => Animation;

  export default animate;
  ```
  </details>

- **`Animation`**

  An object returned by **`animate`** function to manage your animations. It can start, stop and check if animation is running.

  ```js
  const animation = animate((state) => { ... });

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
    stop (): void;
    start (): void;
  }
  ```
  </details>

  - **`running`**: A getter property that indicates if animation is running.

  - **`start()`**: A method to start the animation.

  - **`stop()`**: A method to stop the animation.

## License

Released under [MIT License](./LICENSE).
