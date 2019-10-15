import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
  ${props => (props.area ? `grid-area: ${props.area};` : '')}
`;

const Line = styled.p`
  margin: 0;
`;

const Address = ({
  apartment,
  area,
  city,
  className,
  country,
  postalCode,
  province,
  street,
}) => {
  const lineOne = apartment ? `${apartment}-${street}` : street;
  return (
    <Section area={area} className={className}>
      <Line>{lineOne}</Line>
      <Line>{`${city}, ${province}, ${country}`}</Line>
      <Line>{postalCode}</Line>
    </Section>
  );
};

Address.propTypes = {
  apartment: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  area: PropTypes.string,
  city: PropTypes.string.isRequired,
  className: PropTypes.string,
  country: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
};

Address.defaultProps = {
  apartment: '',
  area: '',
  className: '',
};

export default Address;
