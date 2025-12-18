import React from "react";
import { useState, useEffect, useRef } from "react";
import "./../styles/App.css";

const App = () => {
  // Time stored in centiseconds
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Reference to interval ID
  const intervalRef = useRef(null);

  // Start timer
  const startTimer = () => {
    if (intervalRef.current !== null) return;

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 10); // 10ms = 1 centisecond
  };

  // Stop timer
  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  // Record lap
  const recordLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  };

  // Reset timer and laps
  const resetTimer = () => {
    stopTimer();
    setTime(0);
    setLaps([]);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // Format time into mm:ss:cs
  const formatTime = (centiseconds) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;

    return `${pad(minutes)}:${pad(seconds)}:${pad(cs)}`;
  };

  const pad = (num) => num.toString().padStart(2, "0");

  return (
    <div>
      {/* Do not remove the main div */}
      <div className="timer">
        {formatTime(time)}
      </div>
      <div className="controls">
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={recordLap}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <div className="laps">
        <h2>Laps</h2>
        {laps.length === 0 && <p>No laps recorded</p>}
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              Lap {index + 1}: {formatTime(lap)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
