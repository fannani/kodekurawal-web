import { Query } from 'react-apollo';
import React from 'react';
import { GET_TESTCASE_MISSION } from '../../queries/missions';
import Card from '../UI/Card';

const TestCaseMissionList = ({ onCreate, missionid, onDelete }) => (
  <Card className="card" style={{ marginTop: '20px' }}>
    <div className="card-body">
      <div className="d-flex justify-content-between">
        <h5 className="card-title">Test Case</h5>
        <button type="button" onClick={onCreate} className="btn btn-primary">
          Add Test Case
        </button>
      </div>
      <div className="row" style={{ marginTop: '20px' }}>
        <div className="col-12">
          <Query
            query={GET_TESTCASE_MISSION}
            variables={{ mission: missionid }}
          >
            {({ loading, error, data: { testcaseMission } }) => {
              if (loading) return <p>Loading…</p>;
              if (error) {
                return <p>Sorry! There was an error loading the items</p>;
              }
              return (
                <ul className="list-group">
                  {testcaseMission.map(data => (
                    <li
                      key={data._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {(function() {
                        const render = [];
                        let testCaseCap = data.testcase.caption;
                        let start;
                        let end;
                        let text;
                        let i = 0;
                        do {
                          start = testCaseCap.indexOf('$$');
                          if (start !== -1) {
                            end = testCaseCap.indexOf('$$', start + 2);
                            text = testCaseCap.substring(0, start);
                            testCaseCap = testCaseCap.substring(
                              end + 2,
                              testCaseCap.length,
                            );
                            render.push(
                              <span>{text}</span>,
                              <span>{data.params[i]}</span>,
                            );
                          } else {
                            render.push(<span>{testCaseCap}</span>);
                          }
                          i += 1;
                        } while (start !== -1);
                        return (
                          <>
                            <span>{render}</span>
                            <div>
                              <button className="btn">Edit</button>
                              <button
                                className="btn btn-danger"
                                style={{ marginLeft: '10px' }}
                                onClick={() => {
                                  onDelete(data._id);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        );
                      })()}
                    </li>
                  ))}
                </ul>
              );
            }}
          </Query>
        </div>
      </div>
    </div>
  </Card>
);

export default TestCaseMissionList;
