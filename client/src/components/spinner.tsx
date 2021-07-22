import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../styles';
import {keyframes} from '@emotion/react';

interface Props {
  width?: number;
  height?: number
}

const Spinner = ({width, height}: Props) => {
  return <SpinnerContainer width={width} height={height}>
    <SpinnerSkids />
  </SpinnerContainer>
};

export default Spinner;

const SpinnerSkids = () => {
  return (
    <>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </>
  )
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div((props: Props) => ({
  display: 'inline-block',
  position: 'relative',
  width: props.width || 80,
  height: props.height || 80,
  div: {
    boxSizing: 'border-box',
    display: 'block',
    position: 'absolute',
    width: (props.width || 80) * 0.8,
    height: (props.height || 80) * 0.8,
    border: `8px solid ${colors.primary}`,
    borderRadius: '50%',
    animation: `${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
    borderColor: `${colors.primary} transparent transparent transparent`,

    ":nth-of-type(1)": {
      animationDelay: '-0.45s'
    },
    ":nth-of-type(2)": {
      animationDelay: '-0.3s'
    },
    ":nth-of-type(3)": {
      animationDelay: '-0.15s'
    }
  }
}));