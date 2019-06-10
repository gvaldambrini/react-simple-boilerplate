import { connect } from "react-redux";
import { increment, getCounter, ActionIncrement } from "../modules/counter";
import { GlobalState } from "../modules";

import Home from "../components/Home";

const mapDispatchToProps = {
  increment: (): ActionIncrement => increment(1)
};

const mapStateToProps = (state: GlobalState): object => ({
  counter: getCounter(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
