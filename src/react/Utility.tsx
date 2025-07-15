// Return an array of random colours equal to input
export const randomColourGen = (quantity: number) => {
  const colourArray: string[] = [];

  for (let i = 0; i < quantity; i++) {
    const randomColour = Math.floor(Math.random() * 0xffffff);
    const hexColour = "#" + randomColour.toString(16).padStart(6, "0");
    colourArray.push(hexColour);
  }
  return colourArray;
};
