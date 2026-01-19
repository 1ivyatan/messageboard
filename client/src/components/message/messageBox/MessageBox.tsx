import MessageOptions from "./MessageOptions";

export default function MessageBox(props: any)
{
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <p>{ props.title } | { props.timestamp }</p>
      <p>{ props.body }</p>
      <MessageOptions
        id={props.id}
        votes={props.votes}
      />
    </div>
  );
}