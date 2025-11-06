import React, { useEffect, useState } from "react";

const TimeDate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date and time for a digital-style display
  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
     
        color: "#686e6dff",
        paddingLeft:"1000px",
        
        fontFamily: "Orbitron, monospace",

        width: "fit-content",
        margin: "10px auto",
      }}
    >
      <div
        style={{
          fontSize: "1.2rem",
          letterSpacing: "2px",
        }}
      >
        {formattedTime}
      </div>
      <div
        style={{
          fontSize: "0.9rem",
          color: "#b0b0b0",
          marginTop: "5px",
        }}
      >
        {formattedDate}
      </div>
    </div>
  );
};

export default TimeDate;
