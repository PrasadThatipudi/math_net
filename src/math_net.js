const connectionAddress = (addr) => `${addr.hostname}:${addr.port}`;

const encode = (message) => new TextEncoder().encode(message);
const decode = (message) => new TextDecoder().decode(message);

const displayConnectionSuccessMsg = (connection) => {
  const message = `Client connected from ${connectionAddress(
    connection.remoteAddr
  )}`;

  console.log(message);
};

const displayRequest = (request) => console.log(`REQ: ${request}`);

const handleConnection = async (connection) => {
  for await (const request of connection.readable) {
    displayRequest(decode(request));
    const response = JSON.stringify({ result: 3 });

    await connection.write(encode(response));
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
