import { assertEquals } from "@std/assert/equals";

const encode = (message) => new TextEncoder().encode(message);
const decode = (message) => new TextDecoder().decode(message);

const createRequest = (command, args) => {
  const request = { command, args };
  return JSON.stringify(request);
};

const sendRequest = async (request) => await connection.write(encode(request));

const readResponse = async () => {
  const response = new Uint8Array(1024);
  const byteCount = await connection.read(response);

  return decode(response.subarray(0, byteCount));
};

const test = async (command, args, expected) => {
  const request = createRequest(command, args);
  await sendRequest(request);
  const response = await readResponse();

  assertEquals(JSON.parse(response), expected);
};

const testRaw = async (message, expected) => {
  const [command, ...args] = message.split(/\s+/);
  const expectedKey = typeof expected === "string" ? "error" : "result";

  await test(command, args.map(Number), { [expectedKey]: expected });
};

const runAllRawTests = async () => {
  await testRaw("ADD 1 2", 3);
  await testRaw("ADD 1  2", 3);
  await testRaw("ADD 1 4", 5);
  await testRaw("SUB 4 1", 3);
  await testRaw("SUB 10 3", 7);
  await testRaw("MUL 4 1", 4);
  await testRaw("MUL 10 3", 30);
  await testRaw("DIV 4 1", 4);
  await testRaw("DIV 10 5", 2);
  await testRaw("ADD 10", "Incorrect Argument");
  await testRaw("ADD 10 5 2", "Incorrect Argument");
  await testRaw("AD 10 5", "Unknown Command!");
};

const port = parseInt(Deno.args.at(0));
const connection = await Deno.connect({ port });

await runAllRawTests();
console.log("All tests passed!!!");
