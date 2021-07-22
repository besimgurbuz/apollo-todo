import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles';

interface Props {
  children?: any
}

const Footer = ({children}: Props) => {
  return (
    <FooterContainer>
      2021 ©{'Besim Gurbuz'}
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  color: colors.textSecondary,
  marginTop: 30,
  height: 200,
  padding: 20,
  backgroundColor: 'white',
  borderTop: `solid 1px ${colors.secondary}`
});