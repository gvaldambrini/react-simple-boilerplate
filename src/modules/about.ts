import { Dispatch, Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { Contributor, RawContributor } from "../models";

// ------------------------------------
// Constants

export const MODULE_KEY = "about";

const REPO_URL = "https://api.github.com/repos/facebook/create-react-app";

const CONTRIBUTORS_FETCH_SUCCESS = "about/CONTRIBUTORS_FETCH_SUCCESS";
const CONTRIBUTORS_FETCH_FAILURE = "about/CONTRIBUTORS_FETCH_FAILURE";

// ------------------------------------
// Action creators
interface ActionSuccess extends Action {
  payload: RawContributor[];
}

function fetchContributorsSuccess(
  contributors: RawContributor[]
): ActionSuccess {
  return {
    type: CONTRIBUTORS_FETCH_SUCCESS,
    payload: contributors
  };
}

interface ActionFailure extends Action {
  payload: string;
}

function fetchContributorsFailure(errmessage: string): ActionFailure {
  return {
    type: CONTRIBUTORS_FETCH_FAILURE,
    payload: errmessage
  };
}

export function fetchContributors(): ThunkAction<
  void,
  AnyState,
  void,
  AnyAction
> {
  return async (
    dispatch: Dispatch<ActionSuccess | ActionFailure>
  ): Promise<void> => {
    const response = await fetch(`${REPO_URL}/contributors`);
    if (!response.ok) {
      dispatch(fetchContributorsFailure("Unable to fetch"));
      return;
    }

    try {
      const contributors = await response.json();
      dispatch(fetchContributorsSuccess(contributors));
    } catch (error) {
      dispatch(fetchContributorsFailure(error.message));
    }
  };
}

// ------------------------------------
// Store

interface AnyState {
  [MODULE_KEY]: AboutState;
  [extraProps: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface AboutState {
  readonly contributors: Contributor[];
  readonly loaded: boolean;
}

// ------------------------------------
// Selectors

const local = (state: AnyState): AboutState => state[MODULE_KEY];

export const getContributors = (state: AnyState): Contributor[] => {
  return local(state).contributors;
};

export const contributorsLoaded = (state: AnyState): boolean => {
  return local(state).loaded;
};

// ------------------------------------
// Reducers

const initialState: AboutState = {
  contributors: [],
  loaded: false
};

export default function reducer(
  state = initialState,
  action: AnyAction
): AboutState {
  switch (action.type) {
    case CONTRIBUTORS_FETCH_SUCCESS:
      return {
        ...state,
        contributors: action.payload.map(
          (el: RawContributor): Contributor => new Contributor(el)
        ),
        loaded: true
      };
    case CONTRIBUTORS_FETCH_FAILURE:
      return {
        ...state,
        loaded: true
      };

    default:
      return state;
  }
}

// ------------------------------------
// Testing variables

export const testing = {
  repoUrl: REPO_URL,
  fetchContributorsSuccess,
  fetchContributorsFailure
};
