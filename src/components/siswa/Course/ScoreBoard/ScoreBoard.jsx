import Modal from 'react-bootstrap4-modal';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SiswaCourseScoreBoardStars from './Stars';
// TODO: Fixing ordering after delete
const StyledStars = styled(SiswaCourseScoreBoardStars)`
  text-align: center;
`;
const SiswaCourseScoreBoard = ({
  show,
  life,
  timer,
  score,
  stars,
  stage,
  onReset,
  exp,
}) => (
  <Modal visible={show}>
    <div className="modal-header">
      <h5 className="modal-title">
        {life > 0 ? 'CONGRATULATION' : 'ANDA GAGAL COBA LAGI'}
      </h5>
    </div>
    <div className="modal-body">
      {life > 0 ? <StyledStars value={stars} /> : ''}
      SCORE : {life > 0 ? score : '0'}
      <br />
      TIME : {timer}
      <br />
      <br />
      {life > 0 ? `Anda Mendapat EXP sebesar ${exp}` : ''}
    </div>
    <div className="modal-footer">
      {(function() {
        if (stage.index < stage.course.stages.length) {
          return (
            <Link
              to={`/course/${stage.course._id}`}
              className="btn btn-secondary"
            >
              Kembali
            </Link>
          );
        }
        return (
          <Link to={`/course/${stage.course._id}`} className="btn btn-primary">
            Selesai
          </Link>
        );
      })()}

      <button type="button" className="btn btn-secondary" onClick={onReset}>
        Main lagi
      </button>
      {(function() {
        if (stage.index < stage.course.stages.length) {
          const next = stage.course.stages.find(
            data => data.index === stage.index + 1,
          );
          return (
            <Link to={`/play/${next._id}`} className="btn btn-primary">
              Lanjut
            </Link>
          );
        }
        return '';
      })()}
    </div>
  </Modal>
);

SiswaCourseScoreBoard.propTypes = {
  show: PropTypes.bool.isRequired,
  life: PropTypes.number.isRequired,
  timer: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  stars: PropTypes.array.isRequired,
  stage: PropTypes.object.isRequired,
};

export default SiswaCourseScoreBoard;
