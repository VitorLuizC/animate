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
 * @example
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
 * animation.start();
 * @param {function():void} callback - A callback to handle animation.
 */
export default function animate(callback: () => void): Animation {
  let handle: number | null = null;
  let running = false;

  const run = () => {
    if (!running) return;

    callback();
    handle = window.requestAnimationFrame(run);
  };

  return {
    get running() {
      return running;
    },
    stop: () => {
      if (!running) return;

      if (handle) {
        window.cancelAnimationFrame(handle);
        handle = null;
      }

      running = false;
    },
    start: () => {
      if (running) return;

      running = true;
      run();
    },
  };
}
