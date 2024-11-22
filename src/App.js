import React, { useEffect, useRef } from 'react';

// Global variables for timer state and interval
let isRan = false;
let intervalId = null;

// Clock class to handle the timer logic and time formatting
class Clock {
  constructor(initialSeconds = 0) {
    this.timeInSeconds = initialSeconds;
  }

  // Add time to the current time in seconds
  addTime(secondsToAdd) {
    this.timeInSeconds += secondsToAdd;
  }

  // Format and return the time as hours:minutes:seconds.ms or minutes:seconds.ms or seconds.ms 
  getTime() {
    if (this.timeInSeconds >= 3600) {  
      const hours = Math.floor(this.timeInSeconds / 3600);
      const minutes = Math.floor((this.timeInSeconds % 3600) / 60);
      const seconds = (this.timeInSeconds % 60).toFixed(1);
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    } else if (this.timeInSeconds >= 60) {
      const minutes = Math.floor(this.timeInSeconds / 60);
      const seconds = (this.timeInSeconds % 60).toFixed(1);
      return `${minutes}:${(seconds < 10) ? "0" : ""}${seconds}`;
    } else {
      return `${this.timeInSeconds.toFixed(1)}`;
    }
  }
}

function App({ reload }) {
  const timer = useRef(new Clock()); // Ref to store the timer instance, ensures it persists across renders
  const isRunning = useRef(false); // Ref to track if the timer is running or stopped
  const intervalIdRef = useRef(null); // Ref to store the interval ID for stopping the timer

  // Function to dynamically return the button text based on the timer state (running or stopped)
  const buttonState = () => {
    return isRunning.current ? "Stop" : "Start";
  };

  // Function to update the timer every 10ms and reflect changes on the UI and document title
  const updateClock = () => {
    timer.current.addTime(0.01); // Add 0.01 seconds to the timer
    document.title = timer.current.getTime(); // Update document title to show the timer
    document.getElementById('timer').textContent = timer.current.getTime(); // Update the on-page timer display
  };

  // Function to handle button clicks, toggle timer running state, and start/stop the interval
  const buttonClicked = () => {
    isRunning.current = !isRunning.current; // Toggle the timer state (running or stopped)

    if (isRunning.current) {
      // Start the timer interval
      intervalIdRef.current = setInterval(updateClock, 10);
    } else {
      // Stop the timer interval
      clearInterval(intervalIdRef.current);
    }

    reload(); // Re-render the component if necessary
  };

  // UI layout for the timer and start/stop button
  const UI = (
    <div id="divTimer">
      <h1 id="timer">{timer.current.getTime()}</h1>
      <br />
      <button onClick={buttonClicked} id="startStopButton">{buttonState()}</button>
    </div>
  );

  return UI; // Render the UI
}

export default App;