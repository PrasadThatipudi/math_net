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

const testRaw = async (command, expected) => {
  await connection.write(encode(command));

  const response = new Uint8Array(1024);
  const byteCount = await connection.read(response);
  const actual = decode(response.subarray(0, byteCount));

  assertEquals(JSON.parse(actual), expected);
};

const runAllRawTests = async () => {
  await testRaw("ADD 1 2", 3);
};

const runAllTests = async () => {
  await test("ADD", [1, 2], { result: 3 });
};

const port = parseInt(Deno.args.at(0));
const connection = await Deno.connect({ port });

await runAllTests(connection);
console.log("All tests passed!!!");
