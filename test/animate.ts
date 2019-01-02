import './util/AnimationFrame';
import test from 'ava';
import animate, { Animation } from '../src/animate';

test('API: module default exports a function', (context) => {
  context.is(typeof animate, 'function');
});

test('API: animate returns Animation', (context) => {
  const animation: Animation = animate(() => undefined);

  context.truthy(animation);
  context.is(typeof animation, 'object');
  context.is(typeof animation.stop, 'function');
  context.is(typeof animation.start, 'function');
  context.is(typeof animation.running, 'boolean');
});

test('animate: pass state through animation functions', async (context) => {
  const INITIAL_STATE = 0;
  let state = INITIAL_STATE;

  const animation = animate<number>((_state = INITIAL_STATE) => {
    _state++;
    state = _state;
    return state;
  });

  context.is(state, INITIAL_STATE);

  animation.start();

  context.is(state, 1);

  await new Promise((resolve) => setTimeout(resolve, 500));

  const current = state;
  context.not(state, 1);

  animation.stop();

  context.is(state, current);

  await new Promise((resolve) => setTimeout(resolve, 500));

  context.is(state, current);

  animation.start();

  context.is(state, current + 1);

  animation.stop();

  context.is(state, current + 1);
});

test('Animation: start() starts not running animations', async (context) => {
  let state = 0;
  const animation: Animation = animate(() => void (state = state + 1));

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

test('Animation: stop() staps running animations', async (context) => {
  let state = 0;
  const animation: Animation = animate(() => void (state = state + 1));

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

test('Animation: running indicates if animation is running', async (context) => {
  let state = 0;
  const animation: Animation = animate(() => void (state = state + 1));

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
