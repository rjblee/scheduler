import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  return (
    <ul>
      {props.days.map((daysObject) => {
        return (
          <DayListItem 
            name={daysObject.name}
            spots={daysObject.spots}
            selected={daysObject.name===props.day}
            setDay={props.setDay}
          />
        )
      })}
    </ul>
  )
}