import React, { useRef } from "react";
import styled from "styled-components";

const InputLabel = styled.label`
  color: rgb(150, 150, 150);
  line-height: 25px;
  font-size: 1vw;
  text-align: center;
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 3px;
`;

const InputField = styled.input`
  background-color: transparent;
  outline-width: 0px;
  border-width: 0;
  &:focus + ${InputLabel} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  &:not(:placeholder-shown) + ${InputLabel} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  height: 100%;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
`;

const InputContainer = styled.div`
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  color: #000;
  position: relative;
  height: 60px;
  margin-bottom: 16px;

  &:focus-within {
    border: 1px solid ${(props) => props.theme.colors.primary};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 2px ${(props) => props.theme.colors.primary};
  }
`;

export const Input = ({
  label,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  type?: "text" | "password" | "number" | "email" | "checkbox";
}) => {
  const id = useRef(`${label.replace(" ", "-")}`);

  return (
    <InputContainer style={{}}>
      <div style={{ width: "50%" }}>
        <InputLabel>{label}</InputLabel>
      </div>
      <div style={{ width: "50%" }}>
        <InputField {...props} id={id.current} placeholder=" " />
      </div>
    </InputContainer>
  );
};
