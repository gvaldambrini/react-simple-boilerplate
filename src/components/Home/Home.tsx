import React from "react";

import styles from "./Home.module.scss";

interface Props {
  counter: number;
  increment: () => void;
}

const Home: React.FunctionComponent<Props> = props => (
  <div className={styles.home}>
    <h2>Home</h2>
    <p>Counter: {props.counter}</p>
    <button onClick={props.increment}>Increment</button>
  </div>
);

export default Home;
