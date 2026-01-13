export default function MessageBox(props: any)
{
  return <div>
    <p>{ props.title } | { props.timestamp }</p>
    <p>{ props.body }</p>
  </div>;
}