import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Bold = styled.span`
  font-weight: 600;
`;

const Container = styled.section`
  grid-area: summary;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const CostBreakdown = styled.p`
  font-size: 1.2rem;
  margin: 0;
`;

const TotalCost = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  margin: 0;
`;

const Summary = ({ cart, className }) => (
  <Container className={className}>
    <TotalCost>{`$${cart.length * 10}`}</TotalCost>
    <CostBreakdown>
      <Bold>{cart.length}</Bold>
      {` card${cart.length > 1 ? 's' : ''} at $10 each`}
    </CostBreakdown>
  </Container>
);

Summary.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    cardstock: PropTypes.string.isRequired,
    ideas: PropTypes.string,
  })).isRequired,
  className: PropTypes.string,
};

Summary.defaultProps = {
  className: '',
};

export default Summary;
