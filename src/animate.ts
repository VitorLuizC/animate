export interface Animation {
  /**
   * A getter property that indicates if animation is running.
   */
  readonly running: boolean;

  /**
   * Stops the animation.
   */
  stop: () => void;

  /**
   * Starts the animation.
   */
  start: () => void;
}

/**
 * Creates an Animation object to start and stop your animation functions.
 * @example ```js
 * const count = 0;
 *
 * const animation = createAnimation(() => {
 *   context.clearRect(0, 0, width, height);
 *   context.font = "4rem monospace";
 *   context.textAlign = 'center';
 *   context.fillText(count, width / 2, height / 2);
 *
 *   count++;
 * });
 *
 * animation.start();```
 * @param callback - A callback to handle animation.
 */
export default function animate (callback: () => void): Animation {
  let handle: number | void;
  let running = false;

  const run = () => {
    callback();
    if (running)
      handle = requestAnimationFrame(run);
  };

  return {
    get running () {
      return running;
    },
    stop () {
      if (!running)
        return;
      handle = handle && cancelAnimationFrame(handle);
      running = false;
    },
    start () {
      if (running)
        return;
      running = true;
      run();
    }
  };
};
