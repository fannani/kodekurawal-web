import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import classnames from 'classnames';
import { BASE_URL } from '../../../../config/config';

const SiswaCourseListItem = ({ className, item }) => (
  <Link className={classnames(className, 'm-2')} to={`/course/${item._id}`}>
    <div className="card">
      <img
        className="card-img-top"
        src={`https://firebasestorage.googleapis.com/v0/b/kodekurawal-ab777.appspot.com/o/${
          item.imageid
        }?alt=media`}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.desc}</p>
      </div>
    </div>
  </Link>
);

const StyledCourseItem = styled(SiswaCourseListItem)`
  .card {
    width: 200px;
    height: 250px;
    border-radius: 10px !important;
    text-align: center;
    border: 0;
  }
  h5 {
    font-style: bold;
    font-size: 18px;
    font-family: sans-serif;
  }
  a {
  }
  img {
    display: block;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    height: 70%;
  }
`;
export default StyledCourseItem;
