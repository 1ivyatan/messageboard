export async function get(req: any, res: any): Promise<void> {
  res.json({test: "teeeeeeeeeeest!"});
  res.end();
}

export async function post(req: any, res: any): Promise<void> {
  const { type } = req.body ?? {};

  switch (type) {
    case "up":

      res.json({message: "Message was upvoted"});
      break;

    case "down":

      res.json({message: "Message was downvoted"});
      break;

    default:
      
      break;
  }
  /*const { type } = res.body;

  switch (type) {
    case "up":
      res.json({test: "up!"});

      break;

    case "down":

      res.json({test: "down!"});
      break;

    default:

      res.json({test: "??????!"});
      break;
  }*/
  res.end();
}