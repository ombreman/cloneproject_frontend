import React, { useState } from "react";
import styled from "styled-components";

import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import MissedVideoCallIcon from "@material-ui/icons/MissedVideoCall";
import PhotoLibraryRoundedIcon from "@material-ui/icons/PhotoLibraryRounded";
import MoodRoundedIcon from "@material-ui/icons/MoodRounded";
import VideoCallRoundedIcon from "@material-ui/icons/VideoCallRounded";

import PostCard from "../elements/PostCard";
import Grid from "../elements/Grid";
import Modal from "./Modal";
import Profile from "../elements/Profile";
import profile from "../images/profile.jpg";
import CreatePost from "./CreatePost";

import { useSelector } from "react-redux";

const styles = (theme) => ({
  customBadge: {
    backgroundColor: "green",
    color: "white",
    zIndex: "0",
  },
});

const IntroPost = (props) => {
  const userInfo = useSelector((state) => state.user);

  const users_length = [1, 2, 3, 4];
  const [height, setHeight] = useState(27);

  const { classes } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resizeModal = (h) => {
    let new_height = h + 17.5;
    if (new_height > 35) {
      return;
    } else {
      setHeight(new_height);
    }
  };

  return (
    <>
      <PostCard>
        <Grid is_flex padding="1em">
          <Button>
            <AddRoundedIcon style={{ color: "#1877F2", fontSize: "30px" }} />
          </Button>
          <Contents>
            <Title>스토리 만들기</Title>
            <SubTitle>사진을 공유하거나 글을 남겨보세요</SubTitle>
          </Contents>
        </Grid>
      </PostCard>
      <PostCard>
        <Grid padding="1em">
          <Grid is_flex>
            <Profile
              src={userInfo.profile_url ? userInfo.profile_url : profile}
              margin="0 0.5em 0 0"
            />
            <Modal
              open={open}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              width="32em"
              height={`${height}em`}
              padding="0"
              btn={
                <PostButton>
                  {userInfo.firstName + userInfo.lastName}님, 무슨 생각을 하고
                  계신가요?
                </PostButton>
              }
            >
              <CreatePost handleClose={handleClose} resizeModal={resizeModal} />
            </Modal>
            <Grid />
          </Grid>
          <Line />
          <BtnContainer>
            <MenuButton>
              <MissedVideoCallIcon style={{ color: "red", fontSize: "2em" }} />{" "}
              라이브 방송
            </MenuButton>
            <MenuButton>
              <PhotoLibraryRoundedIcon
                style={{ color: "#00a400", fontSize: "1.8em" }}
              />{" "}
              사진/동영상
            </MenuButton>
            <MenuButton>
              <MoodRoundedIcon
                style={{ color: "#f1c40f", fontSize: "1.8em" }}
              />{" "}
              기분/활동
            </MenuButton>
          </BtnContainer>
        </Grid>
      </PostCard>
      <PostCard>
        <Grid is_flex padding="1em">
          <RoomBtn>
            <VideoCallRoundedIcon
              style={{
                fontSize: "2em",
                color: "#925EBF",
                marginRight: "0.2em",
              }}
            />
            룸스 만들기
          </RoomBtn>
          {users_length.map((user, idx) => (
            <Badge
              key={idx}
              overlap="circular"
              badgeContent=" "
              variant="dot"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              classes={{ badge: classes.customBadge }}
            >
              <Profile src={profile} margin="0 0 0 1em" />
            </Badge>
          ))}
        </Grid>
      </PostCard>
    </>
  );
};

export default withStyles(styles)(IntroPost);

const Button = styled.button`
  border-radius: 50%;
  border: none;
  background-color: #e7f3ff;
  width: 3em;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  margin-left: 1em;
`;

const Title = styled.h3`
  text-align: left;
  margin: 0 0 5px 0;
  font-size: 1em;
`;

const SubTitle = styled.p`
  margin: 0;
  font-size: 0.95em;
`;

const PostButton = styled.button`
  border: none;
  width: 100%;
  flex: 1;
  font-size: 16px;
  padding: 0.6em;
  border-radius: 30px;
  background-color: #f0f2f5;
  color: #606266;
  text-align: left;
  &:hover {
    background-color: #e4e6e8;
  }
`;

const Line = styled.hr`
  color: #f0f2f5;
  width: 100%;
  border: 1px solid #f0f2f5;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const MenuButton = styled.button`
  width: 100%;
  height: 2.7em;
  font-size: 16px;
  font-weight: bold;
  color: #606266;
  border: none;
  border-radius: 9px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  &:hover {
    background-color: #f0f2f5;
  }
`;

const RoomBtn = styled.button`
  background-color: white;
  border: 2px solid #e7f3ff;
  padding: 0.2em 0.5em;
  color: #925ebf;
  font-size: 0.9375rem;
  font-weight: bold;
  border-radius: 3em;
  display: flex;
  height: 100%;
  align-items: center;
  &:hover {
    background-color: #f0f2f5;
  }
`;
