import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import star from '../../../../assets/images/star.png';
import starOff from '../../../../assets/images/star-off.png';

const Star = styled.img``;

const Desc = styled.p`
  font-size: 14px;
`;

const SiswaCourseScoreBoardStars = ({ className, value }) => (
  <div className={classnames(className, 'row justify-content-center')}>
    <div className="col-3">
      <Star width="50px" src={value[0] ? star : starOff} />
      <Desc>Selesaikan Stage</Desc>
    </div>
    <div className="col-3">
      <Star width="50px" src={value[1] ? star : starOff} />
      <Desc>Selesaikan dalam 3 menit</Desc>
    </div>
    <div className="col-3">
      <Star width="50px" src={value[2] ? star : starOff} />
      <Desc>Nyawa lebih dari 1</Desc>
    </div>
  </div>
);

export default SiswaCourseScoreBoardStars;
