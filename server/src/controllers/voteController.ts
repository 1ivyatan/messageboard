export async function get(req: any, res: any): Promise<void> {
  res.json({test: "teeeeeeeeeeest!"});
  res.end();
}