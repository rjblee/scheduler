import React, { useState, useEffect } from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { useApplicationData } from "hooks/useApplicationData";


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  let currentAppointments = getAppointmentsForDay(state, state.day);
  let currentInterviewers = getInterviewersForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={day => setDay(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {currentAppointments.map(appointment => {
          const interview = appointment.interview && getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={currentInterviewers}
              bookInterview={bookInterview}
              deleteInterview={deleteInterview}
            />
          )
        })}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}