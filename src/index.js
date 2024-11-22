import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component
import './index.css'; // Import the CSS styles

// Get the root element from the HTML to render the React application
const root = ReactDOM.createRoot(document.getElementById('app'));

// Reload function to re-render the App component
function reload(){
  // Render the App component, passing the reload function as a prop
  root.render(<App reload={reload}/>);
}

// Initial render of the App component
reload();