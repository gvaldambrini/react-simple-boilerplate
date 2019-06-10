import { Action } from "redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer, {
  fetchContributors,
  getContributors,
  contributorsLoaded,
  testing
} from "./about";
import nock from "nock";

const mockStore = configureMockStore([thunk]);

// As the tests contain mocked json data, turn off the camelcase rule.
/* eslint-disable @typescript-eslint/camelcase */

beforeEach((): void => {
  nock.cleanAll();
});

test("fetch contributors with success", async (): Promise<void> => {
  const data = [
    {
      login: "gvaldambrini",
      avatar_url: "https://avatars3.githubusercontent.com/u/2461921?v=3",
      html_url: "https://github.com/gvaldambrini",
      contributions: 10
    }
  ];

  const u = new URL(testing.repoUrl);
  nock(u.origin)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get(`${u.pathname}/contributors`)
    .reply(200, data);

  const store = mockStore();
  const expectedActions = [testing.fetchContributorsSuccess(data)];

  await store.dispatch(fetchContributors());
  expect(store.getActions()).toEqual(expectedActions);
});

test("fetch contributors with error", async (): Promise<void> => {
  const u = new URL(testing.repoUrl);
  nock(u.origin)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get(`${u.pathname}/contributors`)
    .reply(500, {});

  const store = mockStore();
  const expectedActions = [testing.fetchContributorsFailure("Unable to fetch")];

  await store.dispatch(fetchContributors());
  expect(store.getActions()).toEqual(expectedActions);
});

test("handle the fetchContributorsSuccess action", (): void => {
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

test("handle the fetchContributorsFailure action", (): void => {
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

test("handle an unknown action", (): void => {
  const action: Action = { type: "fake" };
  const newState = reducer(undefined, action);
  expect(newState.contributors).toEqual([]);
  expect(newState.loaded).toEqual(false);
});

test("get the contributors", (): void => {
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

test("check if contributors are loaded", (): void => {
  const aboutState = {
    contributors: [],
    loaded: true
  };

  expect(contributorsLoaded({ about: aboutState })).toEqual(true);
});
