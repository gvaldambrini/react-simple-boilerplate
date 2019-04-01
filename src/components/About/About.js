import React, { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./About.module.scss";

const About = props => {
  const { loaded, fetchContributors } = props;
  useEffect(() => {
    if (!loaded) fetchContributors();
  }, [loaded, fetchContributors]);

  if (!props.loaded) {
    return null;
  }

  const contributors = props.contributors.map(el => (
    <div key={el.username} className={styles.contributor}>
      <img src={el.avatar} alt="" />
      <div>
        <a href={el.url}>{el.username}</a>
        <div className={styles.commits}>
          {el.contributions > 1
            ? `${el.contributions} commits`
            : `${el.contributions} commit`}
        </div>
      </div>
    </div>
  ));

  return (
    <div className={styles.about}>
      <h2>Contributors:</h2>
      <div>{contributors}</div>
    </div>
  );
};

About.propTypes = {
  fetchContributors: PropTypes.func.isRequired,
  contributors: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired
};

export default About;
