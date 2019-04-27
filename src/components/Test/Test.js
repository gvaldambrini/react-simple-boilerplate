import React from "react";
import { Route } from 'react-router-dom';

const Test = (props) => {
    return (
      <div>
      <Route
        path="/:path?"
        render={({ match }) => (
          <div>
            <div style={{ backgroundColor: '#fdd' }}>
              Prop:
              {props.val}
            </div>
            <div style={{ backgroundColor: '#ddf' }}>
              Route params:
              {JSON.stringify(match.params)}
            </div>
          </div>
        )}
      />
    </div>
    );
};

Test.propTypes = {};


export default Test;
