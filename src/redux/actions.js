export const saveToken = (content) => ({
  type: "SAVE_TOKEN",
  payload: {
    content,
  },
});
export const saveUser = (content) => ({
  type: "SAVE_USER",
  payload: {
    content,
  },
});
export const logoutUser = (content) => ({
  type: "LOGOUT_USER",
  payload: {
    content,
  },
});
export const saveTasksList = (content) => ({
  type: "SAVE_TASKS_LIST",
  payload: {
    content,
  },
});
