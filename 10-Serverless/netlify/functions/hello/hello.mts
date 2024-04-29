import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  console.log("Hola mundo desde los hello handler");

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hola mundo" }),
    headers: { "Content-Type": "application/json" },
  };
};

export { handler };
