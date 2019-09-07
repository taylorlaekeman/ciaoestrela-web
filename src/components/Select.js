import React from 'react';
import styled from 'styled-components';
import colours from '../styles/colours';

const Option = styled.div`
  padding: 8px 16px;
  background-color: ${props => props.isSelected ? colours.green[100] : "white"};
  border-radius: ${props => props.isSelected ? "5px" : "0"};

  &:hover {
    background-color: ${props => props.isSelected ? colours.green[200] : colours.grey[200]};
    border-radius: 5px;
  }
`;

const Select = ({ className, onSelect, options, selected }) => {
  return (
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
};

export default Select;
