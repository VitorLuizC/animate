import test, { beforeEach } from 'ava';
import animate, { Animation } from '../src/animate';

const TIME_BETWEEN_FRAMES = 1000 / 16;

beforeEach(() => {
  globalThis.window = {
    cancelAnimationFrame: clearTimeout,
    requestAnimationFrame: (callback: () => void) => {
      return setTimeout(callback, TIME_BETWEEN_FRAMES);
    },
  } as any;
});

test('Animation: start() starts not running animations', async (context) => {
  let state = 0;
  const animation: Animation = animate(() => state++);

  context.is(state, 0);
  context.false(animation.running);

  animation.start();

  context.is(state, 1);
  context.true(animation.running);

  animation.start();

  context.is(state, 1);
  context.true(animation.running);

  await new Promise((resolve) => setTimeout(resolve, 500));

  const current = state;
  context.not(state, 1);
  context.true(animation.running);

  animation.start();

  context.is(state, current);
  context.true(animation.running);

  animation.stop();
});

test('Animation: stop() stops running animations', async (context) => {
  let state = 0;
  const animation: Animation = animate(() => state++);

  context.is(state, 0);
  context.false(animation.running);

  animation.start();

  context.is(state, 1);
  context.true(animation.running);

  animation.stop();

  context.is(state, 1);
  context.false(animation.running);

  animation.stop();

  context.is(state, 1);
  context.false(animation.running);

  await new Promise((resolve) => setTimeout(resolve, 500));

  context.is(state, 1);
  context.false(animation.running);

  animation.start();

  context.is(state, 2);
  context.true(animation.running);

  await new Promise((resolve) => setTimeout(resolve, 500));

  const current = state;
  context.not(state, 2);
  context.true(animation.running);

  animation.stop();

  context.is(state, current);
  context.false(animation.running);

  await new Promise((resolve) => setTimeout(resolve, 500));

  context.is(state, current);
  context.false(animation.running);

  animation.stop();

  context.is(state, current);
  context.false(animation.running);
});

test('Animation: stop() on callback stops the animation', async (context) => {
  const animation: Animation = animate(() => animation.stop());

  context.false(animation.running);

  animation.start();

  context.false(animation.running);

  await new Promise((resolve) => setTimeout(resolve, 500));

  context.false(animation.running);
});

test('Animation: stop() and immediately start() does not create multiple animations', async (context) => {
  let state = 0;
  let timeA = 0;
  let timeB = 0;

  const animation: Animation = animate(() => {
    state++;

    if (state < 2) animation.start();

    if (state % 2 === 1) timeB = Date.now();
    else timeA = Date.now();
  });

  animation.start();

  context.true(animation.running);
  context.is(state, 1);

  await new Promise((resolve) => setTimeout(resolve, 500));

  animation.stop();

  context.false(animation.running);
  context.not(state, 2);
  context.true(TIME_BETWEEN_FRAMES <= Math.abs(timeA - timeB));
});

test('Animation: running indicates if animation is running', async (context) => {
  let state = 0;
  const animation: Animation = animate(() => state++);

  context.is(state, 0);
  context.false(animation.running, 'is false before animation.start()');

  animation.start();

  context.is(state, 1);
  context.true(animation.running, 'immediately true after animation.start()');

  await new Promise((resolve) => setTimeout(resolve, 500));

  const current = state;
  context.not(state, 1);
  context.true(animation.running, 'is true during animation execution');

  animation.stop();

  context.is(state, current);
  context.false(animation.running, 'immediately false after animation.stop()');

  await new Promise((resolve) => setTimeout(resolve, 500));

  context.is(state, current);
  context.false(animation.running, 'is false after animation.stop()');
});
