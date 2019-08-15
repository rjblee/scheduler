import { useReducer, useEffect } from "react";

import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      const newDays = state.days.map(element => {
        if (element.name === state.day) {
          const subtract = { ...element, spots: element.spots - action.days };
          return subtract;
        }
        return element;
      });      
      return {...state, appointments: action.appointments, days: newDays};
    }
    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export function useApplicationData() {

  const [state, setState] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  const setDay = day => setState(currentState => ({ ...currentState, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((response) => {
        setState(/*(currentState)=>(*/({ days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))//)
        // currentAppointments = getAppointmentsForDay(state, state.day);
        // setDays(response.data);
      })
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({ ...state, appointments: appointments })
  }

  function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({ ...state, appointments: appointments })
  }

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview

  }

}