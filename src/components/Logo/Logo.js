import React from 'react';
import { WEIGHTS } from '../../constants';
import styled from 'styled-components/macro';

const Logo = (props) => {
  return (
    <Link href="/">
      <Wrapper {...props}>Sole&amp;Ankle</Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.h1`
  font-size: 1.5rem;
  font-weight: ${WEIGHTS.bold};
  position: absolute;
  left: 32px;
  top: 50%;
  transform: translateY(-50%);
`;

export default Logo;
