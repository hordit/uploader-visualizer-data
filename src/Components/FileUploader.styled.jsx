import styled from "styled-components";

export const StyledFileUploader = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const StyledButton = styled.button`
  margin: 10px 0;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: ${(p) => p.theme.colors.accent};
  color: ${(p) => p.theme.colors.white};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 20px;

  &:hover {
    background-color: #202222;
  }

  span {
    margin-right: 10px;
  }
`;

export const DivContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
