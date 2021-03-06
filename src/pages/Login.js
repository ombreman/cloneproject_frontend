import React, { useRef, useState } from "react";
import Modal from "../components/Modal";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import {
  Background,
  Div,
  BackgroundC,
  FacebookLogo,
  Image,
  LoginBox,
  Input,
  Button,
  Hr,
  P,
  SignUpB,
  SignUpT,
  Bottom,
  ButtonText,
  H1,
  P2,
  DivM,
  DivMC,
  NameBox,
  InputFirstN,
  InputSecondN,
  InputEmail,
  InputPwd,
  DivPicture,
  ProfileImage,
  DivSubButton,
  SignUpBM,
  A,
} from "../components/LoginStyle";
import { actionCreators as ProfileActions } from "../redux/modules/profile";
import { actionCreators as LikeActions } from "../redux/modules/like";
import { actionCreators as UserActions } from "../redux/modules/user";
import { useSelector, useDispatch } from "react-redux";
import x from "../images/x.png";
import Tooltip from "@material-ui/core/Tooltip";
import ModalVedio from "../components/ModalVideo";
import Spinner from "../elements/Spinner";
import { emailCheck, pwdCheck } from "../shared/fromcheck";

const Login = (props) => {
  const [open, setOpen] = useState(false);
  // const [like, setLike] = useState(0);
  // const payloadLike = useSelector((state) => state.like.like_cnt)
  // const [likeState, setLikeState] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close!");
    setOpen(false);
  };

  const dispatch = useDispatch();
  const profileInput = React.useRef();
  const is_uploading = useSelector((state) => state.profile.uploading);
  const profile_url = useSelector((state) => state.profile.profile_url);

  const [FirstName, setFirst] = useState("");
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const signupInfo = { FirstName, Name, email, pwd };
  const [emailL, setEmailL] = useState("");
  const [pwdL, setPwdL] = useState("");

  const selectFile = () => {
    let profile = profileInput.current.files[0];
    dispatch(ProfileActions.uploadProfileFB(profile));
  };

  const signUp = () => {
    if (FirstName === "" || Name === "" || email === "" || pwd === "") {
      window.alert("??? ?????? ???????????????!");
      return;
    }
    if (!emailCheck(email)) {
      window.alert("????????? ????????? ?????? ????????????!");
      return;
    }
    if (!pwdCheck(pwd)) {
      window.alert("???????????? ????????? ?????? ????????????!");
      return;
    }
    dispatch(
      UserActions.signUpDB(
        FirstName,
        Name,
        email,
        pwd,
        profile_url,
        handleClose
      )
    );
  };

  const _logIn = () => {
    dispatch(UserActions.loginDB(emailL, pwdL));
  };

  // const like_plus = () => {
  //   if(!likeState){
  //     let _like = like+1

  //     setLike(_like);
  //     setLikeState(true);
  //   console.log(likeState);
  //   console.log(_like)
  //   dispatch(LikeActions.setLike(_like));
  //   }

  //   else {
  //     let _like = like -1
  //     setLike(_like);
  //     setLikeState(false);
  //   console.log(likeState);
  //   dispatch(LikeActions.setLike(_like));
  //   }
  //   console.log(likeState);
  // }

  return (
    <>
      {/* <button onClick={like_plus}>?????????</button> */}
      {/* <input value={payloadLike}/> */}
      {/* <ModalVedio x={"df"}/> */}

      <Background>
        <Div>
          <BackgroundC>
            <FacebookLogo>
              <Image src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" />
              <h2>
                Fakebook?????? ???????????? ?????? ??????, ??????, ???????????? ?????? ????????????
                ???????????????.
              </h2>
            </FacebookLogo>

            <LoginBox>
              <Input
                onChange={(e) => {
                  setEmailL(e.target.value);
                }}
                placeholder={"?????????"}
              ></Input>
              <Input
                onChange={(e) => {
                  setPwdL(e.target.value);
                }}
                // onKeyPress={}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    _logIn();
                  }
                }}
                placeholder={"????????????"}
                type={"password"}
              ></Input>
              <Button onClick={_logIn}>?????????</Button>
              <P>??????????????? ????????????????</P>
              <Hr width={"90%"} />

              <Modal
                width="432px"
                height="495px"
                btn={
                  <SignUpB>
                    <SignUpT>??? ?????? ?????????</SignUpT>
                  </SignUpB>
                }
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
              >
                <DivM>
                  <img
                    src={x}
                    style={{ width: "15px", height: "15px", float: "right" }}
                    onClick={handleClose}
                  />
                  <H1>????????????</H1>
                  <P2 color={"#eee"}>????????? ????????????.</P2>
                  <DivMC>
                    <NameBox>
                      <Tooltip title="????????? ????????????????">
                        <InputFirstN
                          signUpInfo={signupInfo}
                          onChange={(e) => {
                            setFirst(e.target.value);
                          }}
                          placeholder={"???(???)"}

                        />
                      </Tooltip>
                      <Tooltip title="????????? ????????????????" arrow>
                        <InputSecondN
                          signUpInfo={signupInfo}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          placeholder={"??????(?????? ??????)"}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              signUp();
                            }
                          }}
                        />
                      </Tooltip>
                    </NameBox>
                    <Tooltip
                      title="???????????? ?????? ??????????????? ?????????????????? ??? ???????????? ???????????????."
                      arrow
                    >
                      <InputEmail
                        signUpInfo={signupInfo}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        placeholder={"?????????"}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            signUp();
                          }
                        }}
                      />
                    </Tooltip>
                    <Tooltip
                      title="??????, ??????, ????????????(!,& ???)??? ????????? ?????? ?????? ????????? ??????????????? ???????????????."
                      arrow
                    >
                      <InputPwd
                        signUpInfo={signupInfo}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            signUp();
                          }
                        }}
                        onChange={(e) => {
                          setPwd(e.target.value);
                        }}
                        placeholder={"??? ????????????"}
                        type={"password"}
                      />
                    </Tooltip>
                    <div>
                      {is_uploading ? (
                        <Spinner />
                      ) : (
                        <div>
                          <DivPicture>
                            <Tooltip
                              title="????????? ????????? ????????? ???????????? ????????? ????????? ???????????????."
                              placement="left"
                            >
                              <ProfileImage src={profile_url}></ProfileImage>
                            </Tooltip>
                            <DivSubButton>
                              <input
                                disabled={is_uploading}
                                ref={profileInput}
                                onChange={selectFile}
                                style={{ display: "none" }}
                                id="icon-button-file"
                                type="file"
                              />
                              <label htmlFor="icon-button-file">
                                <IconButton
                                  color="primary"
                                  aria-label="upload picture"
                                  component="span"
                                >
                                  <PhotoCamera />
                                </IconButton>
                              </label>
                            </DivSubButton>
                          </DivPicture>
                          <SignUpBM
                            onClick={signUp}
                            disabled={is_uploading}
                            width={"200px"}
                          >
                            <SignUpT>????????????</SignUpT>
                          </SignUpBM>
                        </div>
                      )}
                    </div>
                  </DivMC>
                </DivM>
                
              </Modal>
            </LoginBox>
          </BackgroundC>
        </Div>
        <Bottom>
        
          <ButtonText>
            <A>
              ????????? English (US) Ti???ng Vi???t Bahasa Indonesia ????????????????????? Espa??ol
              ??????(??????) ????????? Portugu??s (Brasil) Fran??ais (France) Deutsch
            </A>
            <Hr />

            <A>
              ???????????? ????????? Messenger Facebook LiteWatch ?????? ????????? ?????????
              ???????????? ?????? ?????? ?????? Marketplace Facebook Pay ?????? ?????? ??????
              Oculus Portal Instagram ?????? ?????? ????????? ????????? ?????? ?????? ??????
              ?????? ?????? ????????? ????????? ????????? ????????? ?????? ?????? ????????????????????????
              ?????? AdChoices ?????? ?????? ?????? ?????? ???????????? ??????
            </A>
            
          </ButtonText>
        </Bottom>
      </Background>
    </>
  );
};

export default Login;

