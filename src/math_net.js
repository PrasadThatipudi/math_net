const connectionAddress = (addr) => `${addr.hostname}:${addr.port}`;

const displayConnectionSuccessMsg = (connection) => {
  const message = `Client connected from ${connectionAddress(
    connection.remoteAddr
  )}`;

  console.log(message);
};

const handleConnection = async (connection) => {
  const reader = connection.readable.getReader();
  const request = await reader.read();

  await connection.write(request.value);
};

const startServer = async (port) => {
  const listener = Deno.listen({ port });

  for await (const connection of listener) {
    displayConnectionSuccessMsg(connection);
    await handleConnection(connection);
  }
};

const port = parseInt(Deno.args.at(0));

await startServer(port);
