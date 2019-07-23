import React from 'react';

import styled from 'styled-components';

const Sidebar = styled.div`
  width: 400px;
  background-color: #343a40;
  height: 100%;
  color: white;
`;

const Header = styled.div`
  padding: 20px;
`;
const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #191920;
`;

const Title = styled.p`
  color:#4891E3;
  font-weight: bold;
  margin-left:20px;
  margin-top:20px;
  margin-bottom:0px;
  padding-bottom:0px;
`

const SiswaCourseSidebar = ({ className, course }) => (
  <Sidebar className={className}>
    <div id="dismiss">
      <i className="fas fa-arrow-left" />
    </div>

    <Header>
      <h3>{course.name}</h3>
    </Header>
    <Separator />
    <Title>Stages</Title>
    <ul className="list-unstyled components">
      {/*<p>Dummy Heading</p>*/}
      {course.stages.map(stage => (
        <li key={stage._id}>
          <a href="#">
            {stage.index}. {stage.title}
          </a>
        </li>
      ))}
    </ul>
  </Sidebar>
);

const StyledSiswaCourseSidebar = styled(SiswaCourseSidebar)`
  ul.components {
    padding: 20px 0;
    padding-top:10px;
  }
  ul p {
    color: #fff;
  }
  ul li a {
    padding: 10px;
    padding-left: 20px;
    font-size: 1.1em;
    display: block;
  }
  ul li a:hover {
    color: #343a40;
    background: #fff;
  }
  ul li.active > a,
  a[aria-expanded='true'] {
    color: #fff;
    //background: #4891E3;
  }
`;

export default StyledSiswaCourseSidebar;
