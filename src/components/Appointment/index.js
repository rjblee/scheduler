import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import {useVisualMode} from "hooks/useVisualMode";
import axios from "axios";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY)

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    axios.put("/api/appointments/" + props.id, {interview: interview})
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  const onDelete = function() {
    transition(DELETING, true)
    props.deleteInterview(props.id)
    axios.delete("/api/appointments/" + props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  const edit = function() {
    transition(EDIT)
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd = {() => {transition(CREATE)}}/>}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={edit}
        />
      )}
      
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => {transition(EMPTY)}}
          onSave={save}
        >
        </Form>
      )}

      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          onCancel={() => {transition(SHOW)}}
          onConfirm={onDelete}
        />
      )}

      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}

      {mode === EDIT && (
        <Form
          onCancel={() => {transition(SHOW)}}
          onSave={save}
          interviewers={props.interviewers} 
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Could not save"
          onClose={() => {transition(CREATE)}}
        />
      )}  
      
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete"
          onClose={() => {transition(SHOW, true)}}
        />
      )}
    </article>
  )
}

