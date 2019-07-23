import { Mutation, withApollo } from 'react-apollo';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import React from 'react';
import { REORDER_STAGE } from '../../../queries/stages';
import { GET_COURSE_BYID } from '../../../queries/courses';
import { reorder } from '../../../utils/stage';

const AdminStageList = ({ client, onDelete, courseid, stages, onCreate }) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5 className="card-title">Stage List (drag for reordering stage)</h5>
        <button type="button" onClick={onCreate} className="btn btn-primary">
          Add Stage
        </button>
      </div>
      <div className="row" style={{ marginTop: '20px' }}>
        <div className="col-12">
          <Mutation mutation={REORDER_STAGE}>
            {reorderStage => (
              <DragDropContext
                onDragEnd={result => {
                  const { destination, source } = result;
                  if (
                    !destination ||
                    (destination.droppableId === source.droppableId &&
                      destination.index === source.index)
                  ) {
                    return;
                  }

                  const { courses } = client.readQuery({
                    query: GET_COURSE_BYID,
                    variables: {
                      courseid,
                    },
                  });
                  const newstages = reorder(
                    courses[0].stages,
                    source.index + 1,
                    destination.index + 1,
                  );

                  client.writeQuery({
                    query: GET_COURSE_BYID,
                    variables: {
                      courseid,
                    },
                    data: {
                      courses: [
                        {
                          ...courses[0],
                          stages: newstages,
                        },
                      ],
                    },
                  });

                  reorderStage({
                    variables: {
                      courseid,
                      source: source.index + 1,
                      destination: destination.index + 1,
                    },
                  });
                }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th width="80%">TITLE</th>
                      <th width="20%"> ACTION</th>
                    </tr>
                  </thead>
                  <Droppable droppableId="droppable">
                    {provided => (
                      <tbody
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {stages.map(stage => (
                          <Draggable
                            key={stage._id}
                            draggableId={stage._id}
                            index={stage.index - 1}
                          >
                            {provided => (
                              <tr
                                key={stage._id}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <td width="80%">{stage.title}</td>
                                <td width="20%">
                                  <Link
                                    to={`/admin/stage/${stage._id}`}
                                    className="btn"
                                  >
                                    Detail
                                  </Link>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                      onDelete(stage);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </tbody>
                    )}
                  </Droppable>
                </table>
              </DragDropContext>
            )}
          </Mutation>
        </div>
      </div>
    </>
  );
};

export default withApollo(AdminStageList);
