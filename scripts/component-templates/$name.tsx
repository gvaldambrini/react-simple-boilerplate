import React from "react";
import styles from "./${name}.module.scss";

interface Props {
}

const ${name}: React.FunctionComponent<Props> = (props) => {
    return (
      <div className={styles.${name.toLowerCase()}}>
        ${name}
      </div>
    );
};

export default ${name};
