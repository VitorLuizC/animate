export interface Animation {
  /**
   * A getter property that indicates if animation is running.
   */
  readonly running: boolean;

  /**
   * Stops the animation.
   */
  stop (): void;

  /**
   * Starts the animation.
   */
  start (): void;
}

/**
 * Creates an Animation object to start and stop your animation functions. It
 * also pass state through the animation function executions.
 * @example ```js
 * const INITIAL_STATE = { count: 0 };
 *
 * const animation = animate(({ count } = INITIAL_STATE) => {
 *   if (count === 1000)
 *     return animation.stop();
 *
 *   context.clearRect(0, 0, width, height);
 *   context.textAlign = 'center';
 *   context.fillText(count, width / 2, height / 2);
 *   return { count: count + 1 };
 * });
 *
 * animation.start();```
 * @param animation - A function to handle animation and a state (optionally).
 */
const animate = <S>(animation: (state: S | undefined) => S): Animation => {
  let state: S | undefined;
  let handle: number | undefined;

  const run = () => {
    state = animation(state);
    handle = requestAnimationFrame(run);
  };

  return {
    get running () {
      return handle === undefined;
    },
    stop () {
      if (this.running)
        return;
      handle = void cancelAnimationFrame(handle as number);
    },
    start () {
      if (!this.running)
        return;
      run();
    }
  };
};

export default animate;
