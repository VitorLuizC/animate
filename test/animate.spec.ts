import test from 'ava';
import animate, { Animation } from '../src/animate';

test('API: Module default exports a function', (context) => {
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
