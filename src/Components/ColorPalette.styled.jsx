import styled from 'styled-components';

export const ColorPaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ColorBlock = styled.div`
  background-color: ${(props) => props.color};
  width: 50px;
  height: 20px;
`;

export const ColorLabel = styled.span`
display: flex;
justify-content: flex-start;
  margin-left: 10px;
`;

export const PalettContainer = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
padding: 10px;
`;

