import React from "react";
import styled from "styled-components";

import fakebook from "../images/fakebook.png";
import messanger from "../images/messanger.png";
import {
  HomeRounded,
  OndemandVideo,
  PeopleOutline,
  SportsEsports,
  AppsRounded,
  NotificationsRounded,
  SearchRounded,
  DirectionsRun,
} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import profile from "../images/profile.jpg";
import Grid from "../elements/Grid";
import Profile from "../elements/Profile";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const logout = () => {
    dispatch(userActions._logOut());
  };

  return (
    <>
      <HeaderStyle>
        <Logo
          src={fakebook}
          alt="facebook"
          onClick={() => {
            window.location.reload();
          }}
        />
        <Grid is_flex>
          <SearchBtn>
            <SearchRounded style={{ marginRight: "0.3em" }} />
            Fakebook 검색
          </SearchBtn>
        </Grid>
        <MainMenu>
          <Item style={{ borderBottom: "3px solid #1877F2" }}>
            <HomeRounded style={{ color: "#1877F2", fontSize: "32px" }} />
          </Item>
          <Item>
            <OndemandVideo style={IconStyle} />
          </Item>
          <Item>
            <PeopleOutline style={IconStyle} />
          </Item>
          <Item>
            <SportsEsports style={IconStyle} />
          </Item>
        </MainMenu>
        <SideMenu>
          <User>
            <Profile
              src={userInfo.profile_url ? userInfo.profile_url : profile}
              margin="0 0.5em 0 0"
            />
            {userInfo.firstName + userInfo.lastName}
          </User>
          <Button>
            <AppsRounded />
          </Button>
          <Button>
            <Messanger src={messanger} alt="messanger" />
          </Button>
          <Button>
            <NotificationsRounded />
          </Button>
          <Button>
            <Tooltip title="로그아웃!!">
              <DirectionsRun
                onClick={logout}
                style={{
                  fontSize: "1.8em",
                }}
              />
            </Tooltip>
          </Button>
        </SideMenu>
      </HeaderStyle>
    </>
  );
};

Header.defaultProps = {
  userInfo: {
    userEmail: "test@test.com",
    firstName: "사용자",
    profile: null,
  },
};

export default Header;

const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 8%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: white;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
`;

const Logo = styled.img`
  width: 2.5em;
  height: 2.5em;
  position: fixed;
  top: 0.35em;
  left: 1em;
  cursor: pointer;
`;

const SearchBtn = styled.button`
  border: none;
  width: 16em;
  font-size: 14px;
  padding: 0.7em;
  margin-left: 4.5em;
  border-radius: 30px;
  background-color: #f0f2f5;
  color: #606266;
  text-align: left;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #e4e6e8;
  }
`;

const MainMenu = styled.ul`
  width: 28em;
  height: 100%;
  display: flex;
`;

const Item = styled.li`
  height: 100%;
  list-style: none;
  width: 7em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const User = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
`;

const SideMenu = styled.div`
  width: 18em;
  display: flex;
  margin-right: 1em;
  justify-content: space-between;
  align-items: center;
`;

const IconStyle = {
  fontSize: "32px",
  color: "#606266",
};

const Button = styled.button`
  border: none;
  border-radius: 80%;
  width: 3em;
  height: 3em;
  padding: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Messanger = styled.img`
  width: 1.6em;
  height: 1.6em;
`;
