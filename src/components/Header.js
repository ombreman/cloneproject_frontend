import React from "react";
import styled from "styled-components";

import logo from "../images/logo.png";
import messanger from "../images/messanger.png";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import AppsRoundedIcon from "@material-ui/icons/AppsRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

const Header = (props) => {
  return (
    <>
      <HeaderStyle>
        <LogoBtn>
          <Logo
            src={logo}
            alt="facebook"
            onClick={() => {
              window.location.reload();
            }}
          />
        </LogoBtn>
        <MainMenu>
          <Item>
            <HomeRoundedIcon style={IconStyle} />
          </Item>
          <Item>
            <OndemandVideoIcon style={IconStyle} />
          </Item>
          <Item>
            <PeopleOutlineIcon style={IconStyle} />
          </Item>
          <Item>
            <SportsEsportsIcon style={IconStyle} />
          </Item>
        </MainMenu>
        <SideMenu>
          <User>
            {props.userInfo.profile ? (
              <img src={props.profile} alt="profile" />
            ) : (
              <AccountCircleRoundedIcon
                style={{
                  fontSize: "2.2em",
                  marginRight: "5px",
                }}
              />
            )}
            {props.userInfo.firstName}
          </User>
          <Button>
            <AppsRoundedIcon />
          </Button>
          <Button>
            <Messanger src={messanger} alt="messanger" />
          </Button>
          <Button>
            <NotificationsRoundedIcon />
          </Button>
          <Button>
            <ArrowDropDownRoundedIcon
              style={{
                fontSize: "35px",
              }}
            />
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

const LogoBtn = styled.div`
  width: 10%;
`;

const Logo = styled.img`
  width: 2.8em;
  height: 2.8em;
  position: fixed;
  top: 0.35em;
  left: 1em;
  cursor: pointer;
`;

const MainMenu = styled.ul`
  width: 28em;
  margin-left: 7em;
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