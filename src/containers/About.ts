import { connect } from "react-redux";
import {
  fetchContributors,
  getContributors,
  contributorsLoaded
} from "../modules/about";

import { GlobalState } from "../modules";

import About from "../components/About";

const mapDispatchToProps = {
  fetchContributors
};

const mapStateToProps = (state: GlobalState): object => ({
  contributors: getContributors(state),
  loaded: contributorsLoaded(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
