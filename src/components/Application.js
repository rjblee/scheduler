import React, {useState, useEffect} from "react";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState(currentState => ({...currentState, day}));

  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then((response) => {
      console.log('got all responses');
      setState(/*(currentState)=>(*/{...state, days: response[0].data, appointments: response[1].data, interviewers: response[2].data})//)
      // currentAppointments = getAppointmentsForDay(state, state.day);
      // setDays(response.data);
    });

  }, [])
  let currentAppointments =  getAppointmentsForDay(state, state.day);

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
          />
        )
      })}
      <Appointment time="5pm" />
      </section>
    </main>
  );
}


// export const appointments = [
//   {
//     id: 1,
//     time: "12pm"
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Ralph Lee",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Scott Appleton",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Brian Chang",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   }
// ];
