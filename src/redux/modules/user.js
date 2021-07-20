import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import instance from "../../shared/api";

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
  user_name: "",
  email: "",
  profile_url: "",
  is_login: false,
};

const signUpDB = (
  firstName,
  lastName,
  email,
  pwd,
  profile_url,
  handleClose
) => {
  console.log(firstName, lastName, email, pwd, profile_url);
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "http://13.124.107.195/api/signup", //연결 후 설정
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: pwd,
        profilePic: profile_url,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          dispatch(setUser({ email, pwd, profile_url }));
          console.log("회원가입 성공");
          window.alert("회원가입이 완료되었습니다!");
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("이메일이 중복되었습니다!");
      });
  };
};

const loginDB = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "http://13.124.107.195/api/login",
      data: {
        userId: email,
        password: pwd,
      },
    })
      .then((res) => {
        console.log(res.data.token); //201 에러 200 정상 (로그인 시)
        if (res.status === 200) {
          const name = res.data.userInfo.fullName;
          const profile_url = res.data.userInfo.profilePic;
          document.cookie = `MY_COOKIE=${res.data.token};`;
          dispatch(setUser({ email, name, profile_url }));
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("아이디 또는 비밀번호가 잘못되었습니다!");
      });
  };
};

const _logOut = () => {
  return function (dispatch, getState, { history }) {
    document.cookie = `MY_COOKIE=; expires=${new Date(
      "2020-12-12"
    ).toUTCString()}`;
    dispatch(logOut());
    history.replace("/login");
  };
};

const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/api/me`)
      .then((res) => {
        console.log(res.data.userInfo);
        const email = res.data.userInfo.email;
        const name = res.data.userInfo.firstName + res.data.userInfo.lastName;
        const profile_url = res.data.userInfo.profilePic;
        dispatch(setUser({ email, name, profile_url }));
      })
      .catch((error) => console.log(error));
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.email = action.payload.user.email;
        draft.user_name = action.payload.user.name;
        draft.profile_url = action.payload.user.profile_url;
        draft.is_login = true;
        // draft.user_name = action.payload.user_name;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.email = null;
        draft.user_name = null;
        draft.profile_url = null;
        draft.is_login = false;
      }),
  },
  initialState
);

const actionCreators = {
  signUpDB,
  loginDB,
  // duplicate,
  _logOut,
  loginCheckDB,
};

export { actionCreators };
