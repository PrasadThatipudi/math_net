const connectionAddress = (addr) => `${addr.hostname}:${addr.port}`;

const port = parseInt(Deno.args.at(0));
const listener = Deno.listen({ port });

for await (const connection of listener) {
  const message = `Client connected from ${connectionAddress(
    connection.remoteAddr
  )}`;

  console.log(message);
}
