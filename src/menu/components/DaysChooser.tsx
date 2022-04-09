import { Button } from "@material-ui/core";
import { useState, useEffect, ReactElement } from "react";
import styled from "styled-components";
import { Day } from "types";

type DaysChooserProps = {
  initialDays: Day[];
  setDays: (temp: Day[]) => void;
};

const DayButton = styled(Button)`
  width: 5px;
  height: 30px;
  padding-left: 0px;
  padding-right: 0px;
  font-size: 15px;
  margin: 2px;
`;

const dayMapper = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

const DaysChooser = ({
  initialDays,
  setDays,
}: DaysChooserProps): ReactElement => {
  const [days, setDaysState] = useState({
    [Day.Monday]: false,
    [Day.Tuesday]: false,
    [Day.Wendnesday]: false,
    [Day.Thursday]: false,
    [Day.Friday]: false,
    [Day.Saturday]: false,
    [Day.Sunday]: false,
  });

  useEffect(() => {
    const newDays = {
      [Day.Monday]: false,
      [Day.Tuesday]: false,
      [Day.Wendnesday]: false,
      [Day.Thursday]: false,
      [Day.Friday]: false,
      [Day.Saturday]: false,
      [Day.Sunday]: false,
    };

    for (let i = 0; i < initialDays.length; i += 1) {
      newDays[initialDays[i]] = true;
    }
    setDaysState(newDays);
  }, [initialDays]);

  const onClickHandler = (day: Day) => {
    const newDays = {
      ...days,
      [day]: !days[day],
    };

    const dayList = [];
    const entries = Object.entries(newDays);
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i][1]) {
        dayList.push(parseInt(entries[i][0]));
      }
    }
    setDaysState(newDays);
    setDays(dayList);
  };

  return (
    <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
      {Object.entries(days).map(([day, active]) => {
        if (day === "0") {
          return <></>;
        } else {
          return (
            <DayButton
              key={day}
              variant={!active ? "contained" : "outlined"}
              onClick={() => {
                onClickHandler(parseInt(day));
              }}
            >
              {dayMapper[parseInt(day)]}
            </DayButton>
          );
        }
      })}
    </div>
  );
};

export default DaysChooser;
