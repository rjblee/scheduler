import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

/*
id={1}
time="12pm"
interview: object with student
and ineterivewer
*/


export default function Appointment(props) {
  console.log('Appointment props:', props);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/>:<Empty/>}
    </article>
  )
}

