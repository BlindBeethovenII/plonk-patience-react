import React from 'react';

import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';

const trackH = '0.4em';
const thumbD = '1.5em';
const trackC = '#ccced0';
const filllC = '#ffc069';

const track = css`
  box-sizing: border-box;
  border: none;
  height: 4px;
  background: ${trackC};
  border-radius: 8px;
`;

const trackFill = css`
  ${track};
  height: 6px;
  background-color: transparent;
  background-image: linear-gradient(${filllC}, ${filllC}),
    linear-gradient(${trackC}, ${trackC});
  background-size: var(--sx) 6px, calc(100% - var(--sx)) 4px;
  background-position: left center, right center;
  background-repeat: no-repeat;
`;

const fill = css`
  height: ${trackH};
  background: ${filllC};
  border-radius: 4px;
`;

const thumb = css`
  box-sizing: border-box;
  border: none;
  width: ${thumbD};
  height: ${thumbD};
  border-radius: 50%;
  background: white;
  box-shadow: 0px 0px 5px rgba(66, 97, 255, 0.5);
`;

const Input = styled.input`
  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
  }

  &:focus::-webkit-slider-thumb {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:focus::-moz-range-thumb {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:focus::-ms-thumb {
    outline: -webkit-focus-ring-color auto 5px;
  }

  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--val) - var(--min)) / var(--range));
  --sx: calc(0.5 * ${thumbD} + var(--ratio) * (100% - ${thumbD}));

  margin: 0;
  padding: 0;
  height: ${thumbD};
  background: transparent;
  font: 1em/1 arial, sans-serif;

  &::-webkit-slider-runnable-track {
    ${trackFill};
  }

  &::-moz-range-track {
    ${track};
  }

  &::-ms-track {
    ${track};
  }

  &::-moz-range-progress {
    ${fill};
  }

  &::-ms-fill-lower {
    ${fill};
  }

  &::-webkit-slider-thumb {
    margin-top: calc(0.5 * (${trackH} - ${thumbD}));
    ${thumb};
  }

  &::-moz-range-thumb {
    ${thumb};
  }

  &::-ms-thumb {
    margin-top: 0;
    ${thumb};
  }

  &::-ms-tooltip {
    display: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }
`;

const Slider = (props) => {
  const {
    id,
    value,
    setValue,
    left,
    top,
    label,
  } = props;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '160px',
    height: '60px',
  };

  const labelstyle = {
    position: 'relative',
    top: '-12px',
    textAlign: 'center',
    fontSize: '0.8em',
  };

  return (
    <div id={id} style={divstyle}>
      <Input
        onInput={(e) => setValue(e.target.value)}
        type="range"
        value={value}
        style={{
          width: '100%',
          '--min': 0,
          '--max': 100,
          '--val': value,
        }}
      />
      <div style={labelstyle}>{label}</div>
    </div>
  );
};

Slider.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default Slider;
