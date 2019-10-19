import { Route, Switch } from 'react-router-dom';
import React, { lazy } from 'react';
import LoginSiswa from '../pages/siswa/Login';
import LoginAdmin from '../pages/admin/Login';
import Register from '../pages/siswa/Register';
import SiswaProtect from '../components/siswa/Protect';
import AdminProtect from '../components/admin/Protect';

const Dashboard = lazy(() => import('../pages/siswa/Dashboard'));
const CourseList = lazy(() => import('../pages/siswa/CourseList'));
const Achievement = lazy(() => import('../pages/siswa/Achievement'));
const CourseDetail = lazy(() => import('../pages/siswa/CourseDetail'));
const CourseSiswa = lazy(() => import('../pages/siswa/Course'));
const Friends = lazy(() => import('../pages/siswa/Friends'));
const Settings = lazy(() => import('../pages/siswa/Settings'));
const Log = lazy(() => import('../pages/admin/Log'));
const CourseAdmin = lazy(() => import('../pages/admin/Course'));
const StageList = lazy(() => import('../pages/admin/StageList'));
const Stage = lazy(() => import('../pages/admin/Stage'));
const Mission = lazy(() => import('../pages/admin/Mission'));
const TestCase = lazy(() => import('../pages/admin/TestCase'));
const GameSettings = lazy(() => import('../pages/admin/GameSettings'));
const PlayGround = lazy(() => import('../pages/siswa/PlayGround'));
const AchievementAdmin = lazy(() => import('../pages/admin/Achievement'));
const Avatar = lazy(() => import('../pages/admin/Avatar'));
const AchievementDetail = lazy(() =>
  import('../pages/admin/AchievementDetail'),
);

export const RouteSiswa = () => (
  <Switch>
    <Route path="/login" component={LoginSiswa} />
    <Route path="/register" component={Register} />
    <Route path="/playground" component={PlayGround} />
    <SiswaProtect>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/course" component={CourseList} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/achievement" component={Achievement} />
      <Route exact path="/friends" component={Friends} />
      <Route path="/course/:courseid" component={CourseDetail} />
      <Route path="/play/:stageid" component={CourseSiswa} />
    </SiswaProtect>
  </Switch>
);
export const RouteAdmin = () => (
  <Switch>
    <Route path="/admin/login" component={LoginAdmin} />
    <AdminProtect>
      <Route exact path="/admin/log" component={Log} />
      <Route exact path="/admin/course" component={CourseAdmin} />
      <Route exact path="/admin/testcase" component={TestCase} />
      <Route exact path="/admin/course/:courseid" component={StageList} />
      <Route exact path="/admin/achievement" component={AchievementAdmin} />
      <Route exact path="/admin/avatar" component={Avatar} />
      <Route
        exact
        path="/admin/achievement/:achievementid"
        component={AchievementDetail}
      />
      <Route exact path="/admin/stage/:stageid" component={Stage} />
      <Route exact path="/admin/mission/:missionid" component={Mission} />
      <Route exact path="/admin/game-settings" component={GameSettings} />
    </AdminProtect>
  </Switch>
);
