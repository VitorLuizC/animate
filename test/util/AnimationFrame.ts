(global as unknown as Window).requestAnimationFrame =
  (callback: FrameRequestCallback) =>
    setTimeout(callback, 1000 / 64) as unknown as number;

(global as unknown as Window).cancelAnimationFrame =
  (handle: number) => void clearTimeout(handle);
