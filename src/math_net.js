const port = parseInt(Deno.args.at(0));
Deno.listen({ port });
