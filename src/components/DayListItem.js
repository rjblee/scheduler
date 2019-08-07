import React from "react";

import "components/DayListItem.scss";

function formatSpots(count) {
  if (count === 0) {
    return "no spots remaining";
  } else if (count === 1) {
    return "1 spot remaining";
  } else {
    return count + " spots remaining";
  }
}

export default function DayListItem(props) {
  if (props.selected) {
    return (
    <div className="day-list__item--selected" onClick={()=>props.setDay(props.name)}>
      <h1>{props.name}</h1>
      <h3>{formatSpots(props.spots)}</h3>
    </div>
    )
  } else {
    return (
      <div className="day-list__item" onClick={()=>props.setDay(props.name)}>
        <h1>{props.name}</h1>
        <h3>{formatSpots(props.spots)}</h3>
      </div>
    )
  }
}