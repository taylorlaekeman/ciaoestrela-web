import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
  padding: 0 20px;
`;

const Line = styled.p`
  margin: 0;
`;

const Address = ({
  apartment,
  city,
  className,
  country,
  postalCode,
  province,
  street,
}) => {
  const lineOne = apartment ? `${apartment}-${street}` : street;
  return (
    <Section className={className}>
      <Line>{lineOne}</Line>
      <Line>{city}, {province}, {country}</Line>
      <Line>{postalCode}</Line>
    </Section>
  );
};

Address.propTypes = {
  apartment: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
};

Address.defaultProps = {
  apartment: '',
};

export default Address;
