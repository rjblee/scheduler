import React from "react";

import "components/Appointment/styles.scss";

export default function Header(props) {

  return (
    <header class="appointment__time" time={props.time}>
      <h4 class="text--semi-bold">{props.time}</h4>
      <hr class="appointment__separator" />
    </header>
  )
}

