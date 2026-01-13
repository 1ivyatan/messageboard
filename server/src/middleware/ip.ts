export default function ip(req: any, res: any, next: any) {
  console.log(req.ip + " did something");
  next();
}