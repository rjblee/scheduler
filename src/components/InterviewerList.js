import React from "react"; 

import "components/InterviewerList.scss";

export default function InterviewerListItem(props) {
  return (
    <section class="interviewers">
      <h4 class="interviewers__header text--light">Interviewer</h4>
      <ul class="interviewers__list"></ul>
    </section>
  )
}