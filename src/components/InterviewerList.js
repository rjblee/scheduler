import React from "react"; 

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  return (
    <section class="interviewers">
      <h4 class="interviewers__header text--light">Interviewer</h4>
      <ul class="interviewers__list">
        {props.interviewers.map(interviewer => {
          return (
            <InterviewerListItem      
              id={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={props.interviewer === interviewer.id}
              setInterviewer={() => props.setInterviewer(interviewer.id)}
            >
            </InterviewerListItem>
          )
        })}
      </ul>
    </section>
  )
}