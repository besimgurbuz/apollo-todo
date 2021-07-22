import styled from '@emotion/styled';
import React from 'react';
import {Header, Footer} from '../components';
import { unit, widths } from '../styles';

interface Props {
  fullWidth?: boolean,
  children?: any,
  grid?: boolean
}

const Layout = ({fullWidth, children, grid}: Props) => {
  return (
    <>
      <Header />
      <PageContainer fullWidth={fullWidth} grid={grid}>
        {children}
      </PageContainer>
      <Footer />
    </>
  );
};

export default Layout;

const PageContainer = styled.div((props: {fullWidth?: boolean, grid?: boolean}) => ({
  display: 'flex',
  justifyContent: props.grid ? 'center' : 'top',
  flexDirection: props.grid ? 'row' : 'column',
  flexWrap: 'wrap',
  alignSelf: 'center',
  flexGrow: 1,
  maxWidth: props.fullWidth ? '' : `${widths.regulerPageWidth}px`,
  width: '100%',
  padding: props.fullWidth ? 0 : unit * 2,
  paddingBottom: unit * 5
}));