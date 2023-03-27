import React, { useState, useContext } from "react";
import { Input } from "./components/input";
import { ContentWrapper, Layout } from "../../components/Layout";
import styled, {
  ThemeContext,
} from "styled-components";
import { authContext } from "../../context/AuthenticationContext";
import Settings from "../../components/Header";

const Button1 = styled.button`
        background-color: ${(props) => props.theme.colors.buttonColor};
        color: ${(props) => props.theme.colors.fontColor};
        border: 0px;
        border-radius: 10px;
        line-height: 22.4px;
        padding: 13.2px 26.4px;
        text-align: center;
        width: 16%;
        font-weight: 500;
        transition-duration: 250ms;
        margin-bottom: 10px;
        position: absolute;
        bottom: 0;
        left: 50%; 
        transform: translate(-50%, 0);
        outline: 0;
        
        &:hover {
            background-color: #50e150;
        }
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        }
  `;

const SettingsLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const SettingsHeader = styled.div`
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;
const SettingsBody = styled.div`
  height: 100%;
  width: 40%;
  align-self: center;
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  padding: 10px;
`;

const SettingsItemLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 10%;
`;

const SettingsText = styled.div`
  width: 50%;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
`;

const SettingsFunction = styled.div`
  width: 50%;
  display: flex;
`;

interface props {
  providerSetTheme: (t: string) => void;
}

export const SettingsPage: React.FC<props> = ({ providerSetTheme }) => {
  const { token } = useContext(authContext);
  const [newName, setnewName] = useState(null);
  const themeTitel = useContext(ThemeContext);

  const getTokenData = () => {
    if (token) {
      const playerid = JSON.parse(atob(token.split(".")[1])).id;
      console.log(playerid);
      return playerid;
    }
    return null;
  };
  const getnewName = async function (val: any) {
    setnewName(val.target.value);
  };

  const updateName = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = getTokenData();
    await fetch(`/api/player/${id}`, {
      body: `{"name": "${newName}"}`,
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });
    console.log("new name is ", newName);
    alert("Your name has been successfully updated");
  };

  const toggleTheme = () => {
    providerSetTheme(themeTitel.title);
  };

  return (
    <Layout>
      <ContentWrapper>
        <SettingsLayout>
          <SettingsHeader>Settings</SettingsHeader>
          <SettingsBody>
            <SettingsItemLayout>
              <SettingsText>Name</SettingsText>
              <SettingsFunction>
                <Input
                  label="Change Name"
                  name="changename"
                  type="changename"
                  onChange={getnewName}
                ></Input>
              </SettingsFunction>
            </SettingsItemLayout>
            <SettingsItemLayout>
              <SettingsText>Theme</SettingsText>
              <SettingsFunction>
                <Settings toggleTheme={toggleTheme} />
              </SettingsFunction>
            </SettingsItemLayout>
            <Button1 onClick={updateName}>apply changes</Button1>
          </SettingsBody>
        </SettingsLayout>
      </ContentWrapper>
    </Layout>
  );
};
