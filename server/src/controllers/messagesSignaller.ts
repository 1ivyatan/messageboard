import app from "..";

export async function get(req: any, res: any) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  /* vvvvv !!!!!!!!!!!!!!!!!!! vvvvvvvvvvvvv */
  const intervalId = setInterval(() => {
    if (app.locals.newPost != null) {
      res.write(`data: { "_id": "${app.locals.newPost._id}" }\n\n`);
      app.locals.newPost = null;
    }
  }, 100);
  /* ^^^^^^^^^^^^^^^ !!!!!!!!!!!!!!!!! */

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
}
