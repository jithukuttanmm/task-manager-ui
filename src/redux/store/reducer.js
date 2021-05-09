const initialState = {
  token: "",
  user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case "SAVE_TOKEN":
      return { ...state, token: action.payload.content };
    case "SAVE_USER":
      return { ...state, user: action.payload.content };
    case "SAVE_TASKS_LIST":
      return { ...state, tasksList: action.payload.content };
    default:
      return state;
  }
}
