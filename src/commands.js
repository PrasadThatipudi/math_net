const arityLimitedFn =
  (fn, minArgs, maxArgs) =>
  (...args) => {
    if (minArgs <= args.length && args.length <= maxArgs) {
      return fn(...args);
    }

    throw new Error("Incorrect Argument");
  };

const add = arityLimitedFn((a, b) => a + b, 2, 2);
const sub = arityLimitedFn((a, b) => a - b, 2, 2);
const mul = arityLimitedFn((a, b) => a * b, 2, 2);
const div = arityLimitedFn((a, b) => a / b, 2, 2);

const commands = new Map();

commands.set("ADD", add);
commands.set("SUB", sub);
commands.set("MUL", mul);
commands.set("DIV", div);

export { commands };
