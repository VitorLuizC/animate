export const timeBetweenFrames = 1000 / 16;

export const applyAnimationFramePolyfill = () => {
  const window = (globalThis as unknown) as Window;

  window.requestAnimationFrame = (callback: FrameRequestCallback) => {
    return (setTimeout(callback, timeBetweenFrames) as unknown) as number;
  };

  window.cancelAnimationFrame = (handle: number) => void clearTimeout(handle);
};
