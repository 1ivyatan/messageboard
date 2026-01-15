import MessageOptions from "./MessageOptions";

export default function MessageBox(props: any)
{
  return (
    <div>
      <p>{ props.title } | { props.timestamp }</p>
      <p>{ props.body }</p>
      <MessageOptions
        id={props.id}
        votes={props.votes}
      />
      <hr />
    </div>
  );
}