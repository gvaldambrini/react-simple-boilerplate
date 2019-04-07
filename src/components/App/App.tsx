import React from "react";

import { Link } from "react-router-dom";

import "./App.scss";

interface Props {
  children: React.ReactNode;
}

const App: React.FunctionComponent<Props> = props => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
    <hr />
    {props.children}
  </div>
);

export default App;
