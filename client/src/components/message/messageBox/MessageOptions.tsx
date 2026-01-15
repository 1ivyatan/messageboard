import { useEffect, useState } from "react";
import Voting from "./options/Voting";

export default function MessageOptions(props: any) {
  return (
    <div className="flex">
      <Voting
        id={props.id}
        votes={props.votes}
      />
    </div>
  );
}