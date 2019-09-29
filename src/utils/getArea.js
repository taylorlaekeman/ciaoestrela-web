const getArea = (props) => {
  if (!props.area) return '';
  return `grid-area: ${props.area};`;
};

export default getArea;
