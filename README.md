# `@vitorluizc/animate`

Create and manage animation functions with AnimationFrame API and a state.

- :zap: Dependency free and smaller than **160B** (minified + gzipped);
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

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.textAlign = "center";
  context.fillText(count, canvas.width / 2, canvas.height / 2);
  return { count: count + 1 };
});

animation.start();
```

## License

Released under [MIT License](./LICENSE).
