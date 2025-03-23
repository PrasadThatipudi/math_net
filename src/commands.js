const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

const commands = new Map();

commands.set("ADD", add);
commands.set("SUB", sub);
commands.set("MUL", mul);
commands.set("DIV", div);

export { commands };
