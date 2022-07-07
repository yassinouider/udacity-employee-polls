import userReducer, { userSlice, fetchUsers, login } from "./userSlice";

import { store } from "../../app/store";

describe("User redux state tests", () => {
  it("Should initially set user to an empty array and authedUser to null", () => {
    const state = store.getState().user;
    expect(state.users).toEqual([]);
    expect(state.authedUser).toBeNull();
  });

  it("Should be able to fetch the users", async () => {
    const result = await store.dispatch(fetchUsers());
    const users = result.payload;

    expect(result.type).toBe("users/fetchUsers/fulfilled");
    expect(users.length).toEqual(4);
  });
});
