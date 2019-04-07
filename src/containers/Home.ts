import { connect } from "react-redux";
import { increment, getCounter } from "../modules/counter";
import { GlobalState } from "../modules";

import Home from "../components/Home";

const mapDispatchToProps = {
  increment: () => increment(1)
};

const mapStateToProps = (state: GlobalState) => {
  return {
    counter: getCounter(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
