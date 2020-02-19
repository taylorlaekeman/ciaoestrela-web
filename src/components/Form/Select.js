import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Option = styled.div`
  padding: 8px 16px;
  background-color: ${props => (props.isSelected ? props.theme.colours.green[100] : 'white')};
  border-radius: ${props => (props.isSelected ? '5px' : '0')};

  &:hover {
    background-color: ${props => (props.isSelected ? props.theme.colours.green[200] : props.theme.colours.grey[200])};
    border-radius: 5px;
  }
`;

const Select = ({
  className, onSelect, options, selected,
}) => (
  <div className={className}>
    {
      options.map(option => (
        <Option
          key={option}
          onClick={() => onSelect(option)}
          isSelected={option === selected}
        >
          {option}
        </Option>
      ))
    }
  </div>
);

Select.propTypes = {
  className: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
};

Select.defaultProps = {
  className: '',
};

export default Select;
