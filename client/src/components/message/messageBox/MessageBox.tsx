import MessageOptions from "./MessageOptions";

export default function MessageBox(props: any)
{
  return (
    <div className="border bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
      <p>{ props.title } | { props.timestamp }</p>
      <p>{ props.body }</p>
      <MessageOptions
        id={props.id}
        votes={props.votes}
      />
    </div>
  );
}