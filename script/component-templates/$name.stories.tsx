import React from "react";
import { storiesOf } from "@storybook/react";

import ${name} from "./${name}";

storiesOf("${name}", module)
  .add(
      "default",
      (): React.ReactElement | null => {
        return (
          <${name} />
        );
    }
  );
