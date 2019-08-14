import React from "react";

import "components/Appointment/styles.scss";

export default function Empty(props) {

  return (
    <main class="appointment__add" onClick={props.onAdd}>
      <img
        class="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  )
}

