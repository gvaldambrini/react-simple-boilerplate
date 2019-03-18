import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const nock = require("nock");

import reducer, {
  fetchContributors,
  getContributors,
  contributorsLoaded,
  testing
} from "./about";

const mockStore = configureMockStore([thunk]);

beforeEach(() => {
  nock.cleanAll();
});

test("fetch contributors with success", async () => {
  const data = [
    {
      login: "gvaldambrini",
      avatar_url: "https://avatars3.githubusercontent.com/u/2461921?v=3",
      html_url: "https://github.com/gvaldambrini",
      contributions: 10
    }
  ];

  const u = new URL(testing.repo_url);
  nock(u.origin)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get(`${u.pathname}/contributors`)
    .reply(200, data);

  const store = mockStore();
  const expectedActions = [testing.fetchContributorsSuccess(data)];

  await store.dispatch(fetchContributors());
  expect(store.getActions()).toEqual(expectedActions);
});

test("fetch contributors with error", async () => {
  const u = new URL(testing.repo_url);
  nock(u.origin)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get(`${u.pathname}/contributors`)
    .reply(500, {});

  const store = mockStore();
  const expectedActions = [testing.fetchContributorsFailure("Unable to fetch")];

  await store.dispatch(fetchContributors());
  expect(store.getActions()).toEqual(expectedActions);
});

test("handle the fetchContributorsSuccess action", () => {
  const initialState = {
    contributors: [],
    loaded: false
  };

  const data = [
    {
      login: "gvaldambrini",
      avatar_url: "https://avatars3.githubusercontent.com/u/2461921?v=3",
      html_url: "https://github.com/gvaldambrini",
      contributions: 10
    }
  ];

  const newState = reducer(
    initialState,
    testing.fetchContributorsSuccess(data)
  );
  expect(newState.contributors).toEqual([
    {
      username: "gvaldambrini",
      avatar: "https://avatars3.githubusercontent.com/u/2461921?v=3",
      url: "https://github.com/gvaldambrini",
      contributions: 10
    }
  ]);
  expect(newState.loaded).toEqual(true);
});

test("handle the fetchContributorsFailure action", () => {
  const initialState = {
    contributors: [],
    loaded: false
  };

  const newState = reducer(
    initialState,
    testing.fetchContributorsFailure("Unable to fetch")
  );
  expect(newState.contributors).toEqual([]);
  expect(newState.loaded).toEqual(true);
});

test("handle an unknown action", () => {
  const newState = reducer();
  expect(newState.contributors).toEqual([]);
  expect(newState.loaded).toEqual(false);
});

test("get the contributors", () => {
  const aboutState = {
    contributors: [
      {
        login: "gvaldambrini",
        avatar_url: "https://avatars3.githubusercontent.com/u/2461921?v=3",
        html_url: "https://github.com/gvaldambrini",
        contributions: 10
      }
    ],
    loaded: false
  };

  expect(getContributors({ about: aboutState })).toEqual(
    aboutState.contributors
  );
});

test("check if contributors are loaded", () => {
  const aboutState = {
    contributors: [],
    loaded: true
  };

  expect(contributorsLoaded({ about: aboutState })).toEqual(true);
});
