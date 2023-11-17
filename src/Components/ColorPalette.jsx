import { ColorBlock, ColorLabel, ColorPaletteContainer, PalettContainer } from "./ColorPalette.styled";

const ColorPalette = () => {
  return (
    <ColorPaletteContainer>
      <PalettContainer>
        <ColorBlock color="#FF6384" />
        <ColorLabel>Salary greater than $100,000</ColorLabel>
      </PalettContainer>
      <PalettContainer>
        <ColorBlock color="#FFA07A" />
        <ColorLabel>Salary between $60,000 and $100,000</ColorLabel>
      </PalettContainer>
      <PalettContainer>
        <ColorBlock color="#FFD700" />
        <ColorLabel>Salary between $30,000 and $60,000</ColorLabel>
      </PalettContainer>
      <PalettContainer>
        <ColorBlock color="#7CFC00" />
        <ColorLabel>Salary less than $30,000</ColorLabel>
      </PalettContainer>
    </ColorPaletteContainer>
  );
};

export default ColorPalette;
