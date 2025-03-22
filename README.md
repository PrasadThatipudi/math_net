# MathNet

## Objective

You will create a TCP-based Math Server that performs various mathematical operations and a Client that interacts with the server by sending commands and receiving results. This will reinforce your understanding of TCP communication and process management in Deno.

## Assignment Overview
You will implement:

1) A TCP Server that listens on port 8000 and can perform operations like addition, subtraction, multiplication, division, sine, cosine, absolute value, and generating a random number.
2) A TCP Client that reads user input, sends commands to the server, and displays the server's response.

## Expected Flow

### Running the Server

```
deno run -A server.js
```
- The server should start and listen on port 8000.
- It should accept multiple client connections.
- It should handle mathematical operations based on client requests.

### Running the Client

```
deno run -A client.js
```

- The client should accept user input from stdin, send requests to the server, and print the responses.
- The client should support the following commands:
  - `ADD <num1> <num2>` → Returns the sum
  - `SUB <num1> <num2>` → Returns the difference
  - `MUL <num1> <num2>` → Returns the product
  - `DIV <num1> <num2>` → Returns the quotient
  - `ABS <num>` → Returns the absolute value
  - `RAND` → Returns a random number
  - `RAND <start> <end>` → Returns a random number between start and end.
  - `EXIT` → Disconnects the client


## Requirements
- The server should handle multiple clients without crashing.
- The client should handle incorrect inputs gracefully. As mentioned in the next section.
- Use Deno’s TCP module (Deno.listen(), Deno.connect()).
- Ensure proper error handling and validation of commands.
- Cleanly close the connection when EXIT is entered.

## Error Handling

| Student Input | Math Net Response    |
|---------------|----------------------|
| ADD 5 3       | 8                    |
| AD 5 3        | Unknown Command "AD" |
| ADD 5         | Incorrect Argument.  |
| RAND 5        | Incorrect Argument.  |
| EXIT          | Goodbye!             |








