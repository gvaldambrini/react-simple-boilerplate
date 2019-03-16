import React from "react";
import PropTypes from "prop-types";

import styles from "./Home.module.scss";

const Home = props => (
  <div className={styles.home}>
    <h2>Home</h2>
    <p>Counter: {props.counter}</p>
    <button onClick={props.increment}>Increment</button>
  </div>
);

Home.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired
};

export default Home;
