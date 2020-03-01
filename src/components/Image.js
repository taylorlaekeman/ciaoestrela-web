import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  ${props => (props.area ? `grid-area: ${props.area};` : '')}
`;

export default Image;
