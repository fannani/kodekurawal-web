import React from 'react';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

const LoadingScreen = ({ className }) => (
  <div className={className}>
    <BeatLoader className="loading" sizeUnit="px" size={30} color="#9ee5f8" />
  </div>
);

const StyledLoadingScreen = styled(LoadingScreen)`
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 110px;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%); /* IE 9 */
    -webkit-transform: translate(-50%, -50%); /* Chrome, Safari, Opera */
  }
`;
export default StyledLoadingScreen;
