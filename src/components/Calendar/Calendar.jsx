import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";
import "./Calendar.css";

const months = [
  { id: 0, name: "January", days: 31 },
  { id: 1, name: "February", days: 28 },
  { id: 2, name: "March", days: 31 },
  { id: 3, name: "April", days: 30 },
  { id: 4, name: "May", days: 31 },
  { id: 5, name: "June", days: 30 },
  { id: 6, name: "July", days: 31 },
  { id: 7, name: "August", days: 31 },
  { id: 8, name: "September", days: 30 },
  { id: 9, name: "October", days: 31 },
  { id: 10, name: "November", days: 30 },
  { id: 11, name: "December", days: 31 },
];

const getDates = (day) => {
  var dates = [];
  let i = new Date().getDate() - new Date().getDay() + day;
  if (i <= 0) {
    dates.push(-1);
    i += 7;
  }
  while (i > 0) {
    i -= 7;
  }
  i += 7;
  if (day - i + 1 < 0) {
    dates.push(-1);
  }
  for (; i <= months[new Date().getMonth()].days; i += 7) {
    dates.push(i);
  }
  return dates;
};

const CalendarDatesComponent = ({
  getDates,
  day,
  fetchExercise,
  fetchMeditation,
  clicked,
  setClicked,
}) => {
  // useEffect(() => {
  //   console.log(clicked);
  // }, [clicked]);
  return (
    <div
      style={{
        display: "flex",
        flex: 6,
        flexDirection: "column",
        fontSize: 20,
        alignItems: "center",
      }}
    >
      <div
        style={{
          // width: 50,
          color: "#111",
          textAlign: "center",
        }}
      >
        {day}
      </div>

      {getDates().map((value) => {
        if (value === -1) {
          return <div style={{ height: 50, visibility: "collapse" }}>-1</div>;
        }

        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              className={
                (value === new Date().getDate() && "dates") ||
                (clicked === value && "coloured") ||
                "dates-norm"
              }
              style={{
                borderRadius: "50%",
                width: 30,
                cursor: "pointer",
              }}
              onClick={() => {
                if (value <= new Date().getDate()) {
                  let objectDate = new Date();
                  let year = objectDate.getFullYear();
                  let month = months[new Date().getMonth()].id + 1;
                  let day = value;
                  let datestr = year + "-" + month + "-" + day;
                  fetchExercise(datestr);
                  fetchMeditation();
                  setClicked(value);
                }
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  color: new Date().getDate() < value && "gray",
                  cursor: new Date().getDate() < value && "initial",
                }}
              >
                {value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Calendar = () => {
  const context = useContext(UserContext);
  const { fetchExercise, fetchMeditation } = context;
  const [clicked, setClicked] = useState(0);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          fontWeight: 300,
        }}
      >
        <div
          style={{
            flex: 1,
            fontSize: 40,
            fontWeight: 700,
            background: "black",
            color: "white",
            padding: 20,
            borderTopLeftRadius: 27,
            borderTopRightRadius: 27,
          }}
        >
          {months[new Date().getMonth()].name}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 30,
          padding: "0px 20px",
        }}
      >
        <CalendarDatesComponent
          getDates={() => getDates(0)}
          day="S"
          fetchExercise={fetchExercise}
          fetchMeditation={fetchMeditation}
          setClicked={setClicked}
          clicked={clicked}
        />
        <CalendarDatesComponent
          getDates={() => getDates(1)}
          day="M"
          fetchExercise={fetchExercise}
          fetchMeditation={fetchMeditation}
          setClicked={setClicked}
          clicked={clicked}
        />
        <CalendarDatesComponent
          getDates={() => getDates(2)}
          day="T"
          fetchExercise={fetchExercise}
          fetchMeditation={fetchMeditation}
          setClicked={setClicked}
          clicked={clicked}
        />
        <CalendarDatesComponent
          getDates={() => getDates(3)}
          day="W"
          fetchExercise={fetchExercise}
          fetchMeditation={fetchMeditation}
          setClicked={setClicked}
          clicked={clicked}
        />
        <CalendarDatesComponent
          getDates={() => getDates(4)}
          day="T"
          fetchExercise={fetchExercise}
          fetchMeditation={fetchMeditation}
          setClicked={setClicked}
          clicked={clicked}
        />
        <CalendarDatesComponent
          getDates={() => getDates(5)}
          day="F"
          fetchExercise={fetchExercise}
          fetchMeditation={fetchMeditation}
          setClicked={setClicked}
          clicked={clicked}
        />
        <CalendarDatesComponent
          getDates={() => getDates(6)}
          day="S"
          fetchExercise={fetchExercise}
          fetchMeditation={fetchMeditation}
          setClicked={setClicked}
          clicked={clicked}
        />
      </div>
    </>
  );
};

export default Calendar;
