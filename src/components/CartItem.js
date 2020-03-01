import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ReactComponent as UnstyledEdit } from 'assets/icons/pencil.svg';
import { ReactComponent as UnstyledDelete } from 'assets/icons/trash.svg';
import Button from './Button';

const truncateIdeas = ideas => {
  if (ideas.length <= 40) {
    return ideas;
  }
  const words = ideas.substring(0, 40).split(' ');
  const sentence = words.reduce(
    (accumulator, currentValue) => `${accumulator} ${currentValue}`
  );
  return `${sentence}...`;
};

const getGridAreas = ({ ideas, isSelected }) => {
  let base = "'title title title''cardstock cardstock cardstock'";
  if (ideas !== '') base += "'ideas ideas ideas'";
  if (isSelected) base += "'edit delete .'";
  return base;
};

const Section = styled.section`
  ${props => props.theme.panel}
  display: grid;
  grid-template-areas: ${getGridAreas};
  grid-template-columns: auto auto 1fr;
  grid-gap: 10px;
`;

const Heading = styled.h3`
  grid-area: title;
  margin: 0;
  font-size: 1.2rem;
`;

const Cardstock = styled.p`
  grid-area: cardstock;
  margin: 0;
`;

const Ideas = styled.p`
  grid-area: ideas;
  margin: 0;
`;

const Bold = styled.mark`
  font-weight: 600;
  color: ${props => props.theme.colours.grey[600]};
  background: none;
`;

const EditButton = styled(Button)`
  grid-area: edit;
`;

const Edit = styled(UnstyledEdit)`
  ${props => props.theme.icon}
`;

const DeleteButton = styled(Button)`
  grid-area: delete;
`;

const Delete = styled(UnstyledDelete)`
  ${props => props.theme.icon}
`;

const CartItem = ({ index, isSelected, item, onDelete, onSelect }) => {
  const ideasText = isSelected ? item.ideas : truncateIdeas(item.ideas);
  return (
    <Section
      ideas={item.ideas}
      onClick={() => onSelect(item)}
      isSelected={isSelected}
    >
      <Heading>Custom card</Heading>
      <Cardstock>
        {'on '}
        <Bold>{item.cardstock}</Bold>
        {' paper'}
      </Cardstock>
      {item.ideas && <Ideas>{ideasText}</Ideas>}
      {isSelected && (
        <EditButton navigateTo={`/order/${index + 1}`}>
          <Edit />
        </EditButton>
      )}
      {isSelected && (
        <DeleteButton onClick={onDelete}>
          <Delete />
        </DeleteButton>
      )}
    </Section>
  );
};

CartItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    cardstock: PropTypes.string.isRequired,
    ideas: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CartItem;
