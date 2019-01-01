export interface Animation {
  stop (): void;
  start (): void;
}

/**
 * Creates an Animation object to start and stop your animation functions. It
 * also pass state through the animation function executions.
 * @param animation - A function to handle animation and a state (optionally).
 */
const animate = <S>(animation: (state: S | undefined) => S): Animation => {
  let state: S | undefined;
  let handle: number | undefined;

  const run = (): void => {
    state = animation(state);
    handle = requestAnimationFrame(run);
  };

  return {
    stop (): void {
      if (handle === undefined)
        return;
      handle = void cancelAnimationFrame(handle);
    },
    start (): void {
      if (handle !== undefined)
        return;
      run();
    }
  };
};

export default animate;
