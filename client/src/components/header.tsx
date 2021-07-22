import styled from '@emotion/styled';
import { Link } from '@reach/router';
import React from 'react';
import logo from '../assets/todos_app_logo.png'
import { colors, widths } from '../styles';

interface Props {
  children?: any
}

const Header = ({ children }: Props) => {
  return (
    <HeaderBar>
      <Container>
        <HomeButtonContainer>
          <HomeLink to="/">
            <HomeButton>
              <LogoContainer>
                <Logo src={logo}/>
              </LogoContainer>
              <Title>
                <h3>Apollo Todo</h3>
                <div>Todo app from Apollo</div>
              </Title>
            </HomeButton>
          </HomeLink>
        </HomeButtonContainer>
        {children}
      </Container>
    </HeaderBar>
  );
};

export default Header;

const HeaderBar = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `solid 1px ${colors.secondary}`,
  boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.15)',
  padding: '5px 30px',
  minHeight: 80,
  backgroundColor: 'white'
});

const Container = styled.div({
  width: `${widths.regulerPageWidth}px`
});

const HomeLink = styled(Link)({
  textDecoration: 'none'
});

const HomeButtonContainer = styled.div({
  display: 'flex',
  flex: 1
});

const HomeButton = styled.div({
  display: 'flex',
  flexDirection: 'row',
  color: colors.accent,
  alignItems: 'center',
  ':hover': {
    color: colors.secondary
  }
});

const LogoContainer = styled.div({ display: 'flex', alignSelf: 'center'});

const Logo = styled.img({
  height: 60,
  width: 60,
  marginRight: 8
});

const Title = styled.div({
  display: 'flex',
  flexDirection: 'column',
  h3: {
    lineHeight: '1em',
    marginBottom: 0
  },
  div: {
    fontSize: '0.9em',
    lineHeight: '0.8em',
    paddingLeft: 2,
  }
});