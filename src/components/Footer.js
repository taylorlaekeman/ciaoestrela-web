import React from 'react';
import styled from 'styled-components';

import FacebookImage from 'assets/images/facebook.png';
import InstagramImage from 'assets/images/instagram.png';

const Footer = styled.footer`
  display: grid;
  padding: 20px;
  background-color: ${props => props.theme.colours.green[200]};
  grid-template-columns: 1fr;
  grid-template-areas: 'content';

  @media (min-width: 1160px) {
    grid-template-areas: '. content .';
    grid-template-columns: 1fr 1120px 1fr;
  }
`;

const Content = styled.article`
  grid-area: content;
  display: grid;
  grid-template-areas:
    'email    '
    'social   '
    'copyright';
  justify-content: center;
  grid-auto-columns: max-content;
  grid-row-gap: 40px;
  text-align: center;

  @media (min-width: 600px) {
    grid-template-areas: 'email copyright social';
    justify-content: space-between;
    text-align: right;
  }
`;

const Copyright = styled.p`
  margin: 0;
  grid-area: copyright;
`;

const Social = styled.article`
  grid-area: social;
  justify-items: center;
`;

const Heading = styled.h4`
  margin: 0;
`;

const List = styled.ul`
  margin: 0;
  padding: 5px 0;
`;

const ListItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Link = styled.a`
  grid-area: ${props => props.area};
  color: ${props => props.theme.colours.grey[400]};
`;

const Image = styled.img`
  width: 29px;
  height: 29px;
  margin: 8px 20px;
  margin-left: 0;
  vertical-align: middle;
`;

export default () => (
  <Footer>
    <Content>
      <Link area="email" href="mailto:alicia@ciaoestrela.co">
        Send me an email
      </Link>
      <Copyright>
        &copy;
        {` ${new Date(Date.now()).getFullYear()} Ciao, Estrela Co.`}
      </Copyright>
      <Social>
        <Heading>Follow me!</Heading>
        <List>
          <ListItem>
            <Link href="https://instagram.com/ciaoestrelaco">
              <Image src={InstagramImage} />
            </Link>
            <Link href="https://instagram.com/ciaoestrelaco">Instagram</Link>
          </ListItem>
          <ListItem>
            <Link href="https://facebook.com/ciaoestrelaco">
              <Image src={FacebookImage} />
            </Link>
            <Link href="https://facebook.com/ciaoestrelaco">Facebook</Link>
          </ListItem>
        </List>
      </Social>
    </Content>
  </Footer>
);
