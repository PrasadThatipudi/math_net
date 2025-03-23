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

const handleRequest = ({ command, args }) => {
  if (!commands.has(command)) return { error: "Unknown Command!" };

  try {
    const result = commands.get(command)(...args);
    return { result };
  } catch (error) {
    return { error: error.message };
  }
};

const loggerStream = () =>
  new TransformStream({
    transform(chunk, controller) {
      console.log(decode(chunk));

      controller.enqueue(chunk);
    },
  });

const handleRequestStream = () =>
  new TransformStream({
    transform(chunk, controller) {
      const request = JSON.parse(decode(chunk));
      const response = JSON.stringify(handleRequest(request));

      controller.enqueue(encode(response));
    },
  });

const handleConnection = (connection) => {
  connection.readable
    .pipeThrough(loggerStream())
    .pipeThrough(handleRequestStream())
    .pipeTo(connection.writable);
};

const startServer = async (port) => {
  const listener = Deno.listen({ port });
  console.log(`Listening on ${connectionAddress(listener.addr)}`);

  for await (const connection of listener) {
    displayConnectionSuccessMsg(connection);

    handleConnection(connection);
  }
};

const port = parseInt(Deno.args.at(0));

await startServer(port);
