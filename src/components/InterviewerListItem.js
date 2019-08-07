import React from "react"; 
import classnames from "classnames";

import "components/InterviewerListItem.scss";

/* props
id: number
name: string
avatar: string that is a url
selected: boolean t/f

classnames("1", "2", "3") returns
"1 2 3"

if(props.selected === true) {
  add selected class
}

*/

export default function InterviewerListItem(props) {
  const interviewerItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  return (
    <li key={props.id} className={interviewerItemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}