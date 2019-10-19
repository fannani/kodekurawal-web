import React from 'react';
import { Query } from 'react-apollo';
import { GET_COURSE_BY_PLAYER } from '../../../queries/player';
import Loader from './Loader';
import CourseItem from '../Course/List/Item';
import Card from '../../UI/Card';
import { Link } from 'react-router-dom';

const SiswaDashboardCourse = ({ playerid, onTakeCourse }) => (
  <Card className="card ">
    <div className="card-body">
      <h5 className="card-title">My Course</h5>
      <Query query={GET_COURSE_BY_PLAYER} variables={{ playerid }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <p />;
          if (data.players[0].course.length) {
            return (
              <div className="d-flex flex-wrap">
                {data.players[0].course.map(course => (
                  <CourseItem key={course._id} item={course} />
                ))}
              </div>
            );
          }
          return (
            <div className="d-flex flex-wrap" id="btn-ambil-course">
              <button
                className="btn btn-primary"
                onClick={onTakeCourse}
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Ambil Course
              </button>
            </div>
          );
        }}
      </Query>
    </div>
  </Card>
);

export default SiswaDashboardCourse;
