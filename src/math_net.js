import { commands } from "./commands.js";

const connectionAddress = (addr) => `${addr.hostname}:${addr.port}`;

const encode = (message) => new TextEncoder().encode(message);
const decode = (message) => new TextDecoder().decode(message);

const displayConnectionSuccessMsg = (connection) => {
  const message = `Client connected from ${connectionAddress(
    connection.remoteAddr
  )}`;

  console.log(message);
};

const displayRequest = (request) => console.log(`REQ:`, request);

const handleRequest = ({ command, args }) => {
  if (!commands.has(command)) return { error: "Unknown Command!" };

  try {
    const result = commands.get(command)(...args);
    return { result };
  } catch (error) {
    return { error: error.message };
  }
};

const debug = function (arg) {
  console.log(arg);
  return arg;
};

const sendResponse = async (connection, response) => {
  await connection.write(encode(JSON.stringify(response)));
};

const handleConnection = async (connection) => {
  for await (const chunk of connection.readable) {
    const request = JSON.parse(decode(chunk));
    displayRequest(request);

    const response = handleRequest(request);
    await sendResponse(connection, response);
  }
};

const startServer = async (port) => {
  const listener = Deno.listen({ port });
  console.log(`Listening on ${connectionAddress(listener.addr)}`);

  for await (const connection of listener) {
    displayConnectionSuccessMsg(connection);
    await handleConnection(connection);
  }
};

const port = parseInt(Deno.args.at(0));

await startServer(port);
