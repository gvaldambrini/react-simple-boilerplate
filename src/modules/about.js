// ------------------------------------
// Constants

const REPO_URL =
  "https://api.github.com/repos/gvaldambrini/react-simple-boilerplate";

const CONTRIBUTORS_FETCH_SUCCESS = "about/CONTRIBUTORS_FETCH_SUCCESS";
const CONTRIBUTORS_FETCH_FAILURE = "about/CONTRIBUTORS_FETCH_FAILURE";

// ------------------------------------
// Action creators

function fetchContributorsSuccess(contributors) {
  return {
    type: CONTRIBUTORS_FETCH_SUCCESS,
    payload: contributors
  };
}

function fetchContributorsFailure(errmessage) {
  return {
    type: CONTRIBUTORS_FETCH_FAILURE,
    payload: errmessage
  };
}

export function fetchContributors() {
  return async dispatch => {
    const response = await fetch(`${REPO_URL}/contributors`);
    if (!response.ok) {
      return dispatch(fetchContributorsFailure("Unable to fetch"));
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
// Selectors

export const getContributors = state => state.about.contributors;
export const contributorsLoaded = state => state.about.loaded;

// ------------------------------------
// Store & reducer

const initialState = {
  contributors: [],
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CONTRIBUTORS_FETCH_SUCCESS:
      return {
        ...state,
        contributors: action.payload.map(el => ({
          username: el.login,
          contributions: el.contributions,
          avatar: el.avatar_url,
          url: el.html_url
        })),
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
  repo_url: REPO_URL,
  fetchContributorsSuccess,
  fetchContributorsFailure
};
