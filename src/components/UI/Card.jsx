import styled from 'styled-components';

const Card = styled.div`
  border-radius: 10px !important;
  border: ${props => props.theme.cardBorder};
`;
export default Card;
