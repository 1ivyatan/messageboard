export async function get(req: any, res: any) {
  // Set headers to keep the connection alive and tell the client we're sending event-stream data
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send an initial message
  res.write(`data: Connected to server\n\n`);

  // Simulate sending updates from the server
  let counter = 0;
  const intervalId = setInterval(() => {
    counter++;
    // Write the event stream format
    res.write(`data: Message ${counter}\n\n`);
    console.log(`data: Message ${counter}\n\n`);
  }, 2000);

  // When client closes connection, stop sending events
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
}
