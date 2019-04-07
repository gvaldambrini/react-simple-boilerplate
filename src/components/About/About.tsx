import React, { useEffect } from "react";

import { Contributor } from "../../models";
import styles from "./About.module.scss";

interface Props {
  loaded: boolean;
  fetchContributors: () => void;
  contributors: ReadonlyArray<Contributor>;
}

const About: React.FunctionComponent<Props> = props => {
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

export default About;
