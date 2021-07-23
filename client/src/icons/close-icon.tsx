import React from 'react';

type Props = {
  size: number;
  className: string;
  color: string;
  viewBox: string;
  style: Record<string, unknown>;
} & typeof defaultProps;

const defaultProps = {
  size: 16,
  className: '',
  color: '#000000',
  viewBox: '0 0 24 24',
  style: {},
};

const CloseIcon = ({ size, className, color, viewBox, style }: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    style={style}
    width={`${size}px`}
    height={`${size}px`}
    fill={color}
    viewBox={viewBox}
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M6 18L18 6M6 6l12 12'
    />
  </svg>
);

CloseIcon.defaultProps = defaultProps;

export default CloseIcon;
