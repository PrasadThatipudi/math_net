const port = parseInt(Deno.args.at(0));
const connection = await Deno.connect({ port });

await connection.write(new TextEncoder().encode("hello"));

const reader = connection.readable.getReader();
const response = await reader.read();

console.log(new TextDecoder().decode(response.value));
