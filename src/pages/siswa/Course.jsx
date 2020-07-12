import React, { useState, useEffect } from 'react';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Tour from 'reactour';
import Sidebar from 'react-sidebar';
import shortid from 'shortid';
import OutOfEnergyModal from '../../components/siswa/Course/OutOfEnergyModal';
import SiswaCourseValidator from '../../components/siswa/Course/Validator';
import SiswaCourseFooter from '../../components/siswa/Course/Footer';
import SiswaCourseScoreBoard from '../../components/siswa/Course/ScoreBoard/ScoreBoard';
import SiswaCourseSidebar from '../../components/siswa/Course/Sidebar';
import {
  GET_STAGE_BY_COURSE_PLAYER,
  GET_STAGE_BY_PLAYER,
} from '../../queries/stages';
import { calculateStars } from '../../utils/course';
import PreventNavigationDialog from '../../components/PreventNavigationDialog';
import usePlayer from '../../hooks/player';
import useInteractiveCoding from '../../hooks/interactiveCoding';
import { ADD_SCORE } from '../../queries/courses';
import {
  GET_COURSE_BY_PLAYER,
  GET_PLAYER_ACHIEVEMENTS,
} from '../../queries/player';
import Loader from '../../components/siswa/Course/Loader';
import Coding from "./Coding";
import Quiz from "./Quiz";
import Material from "./Material";
import {Link} from "react-router-dom";
import styled from 'styled-components';
//TODO: Output default mode
//TODO: useRef in interval (Riset)
//TODO: useRef in script

let script = '';
let interval = null;
const energyNeed = 20;

const Container = styled.div`
  background-color:${props => props.theme.backgroundColor};
`

const tour = [
  {
    selector: '#teory',
    content: 'Ini adalah bagian teori, silahkan baca terlebih dahulu',
  },
  {
    selector: '#mission',
    content:
      'Terdapat beberapa misi yang harus diselesaikan, setiap misi akan mendapatkan score, selesaikan dengan sesingkat mungkin dan tanpa kesalahan untuk mendapatkan bintang',
  },
  {
    selector: '#brace-editor',
    content: 'Tuliskan script di bagian ini sesuai dengan perintah di misi',
  },
  {
    selector: '#run',
    content: 'Klik jalankan untuk melihat hasil output dari script',
  },
  {
    selector: '#output-tab',
    content: 'Setelah itu output akan tampil di bagian ini',
  },
  {
    selector: '#check',
    content:
      'Klik periksa jika script sudah dirasa benar untuk mendapatkan score',
    style: {
      maxWidth: '370px',
    },
  },
];

const Course = ({
  match: {
    params: { stageid },
  },
  history,
}) => {
  const player = usePlayer();
  const interactive = useInteractiveCoding();
  const [scoreResult, setScoreResult] = useState(0);
  const [lifeResult, setLifeResult] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fromMaterial, setFromMaterial] = useState(false);
  const [isPlay, setIsPlay] = useState(true);
  const [editorId, setEditorId] = useState(() => shortid.generate());
  const [showModal, setShowModal] = useState(false);
  const [stars, setStars] = useState([]);
  const [showOutOfEnergy, setShowOutOfEnergy] = useState(false);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [stage, setStage] = useState({});
  const [tourOpen, setTourOpen] = useState(
    player.user.player.tutorial[0] === null ||
      player.user.player.tutorial.length === 0
      ? true
      : player.user.player.tutorial[0],
  );

  useEffect(() => {
    if(fromMaterial){
      if (stage.index < stage.course.stages.length) {
        const next = stage.course.stages.find(
          data => data.index === stage.index + 1,
        );
        history.push(`/play/${next._id}`);
      } else {
        history.push(`/course/${stage.course._id}`)
      }
      setFromMaterial(false);
    }
  },[ fromMaterial])

  const reset = () => {
    setShowModal(false);
    setEditorId(shortid.generate());
    setIsPlay(true);
    player.resetTimer();
    player.addEnergy(energyNeed * -1);
    interval = setInterval(player.incrementTimer, 1000);
    player.setPlayerStatus(0, 3);
    player.setPlayMode(true);
    //FOR QUIZ
    setFromMaterial(false);
    setIndexQuestion(0);

  };
  useEffect(
    () => {
      reset();
      if (player.user.player.energy - energyNeed < 0) {
        setIsPlay(false);
        setShowOutOfEnergy(true);
      }

      return () => {
        player.setPlayMode(false);
        clearInterval(interval);
      };
    },
    [stageid],
  );
  return (
    <Container id="container">
      <Query
        query={GET_STAGE_BY_PLAYER}
        variables={{ id: stageid, playerid: player.user.player._id }}
      >
        {({ data: { stages }, loading, error }) => {
          if (loading) return <Loader />;
          if (error) return <p>Sorry! There was an error loading the items</p>;
          return (
            <>
              <Sidebar
                sidebar={<SiswaCourseSidebar course={stages[0].course} />}
                open={sidebarOpen}
                onSetOpen={open => {
                  setSidebarOpen(open);
                }}
                styles={{
                  sidebar: { background: 'white', zIndex: '1001' },
                  overlay: { zIndex: '1000' },
                }}
              >
                <></>
              </Sidebar>
              <main role="main" className="container-fluid">
                <Mutation
                  mutation={ADD_SCORE}
                  update={(cache, { data: { addScore } }) => {
                    cache.writeQuery({
                      query: GET_STAGE_BY_COURSE_PLAYER,
                      variables: {
                        courseid: stages[0].course._id,
                        playerid: player.user.userdetailid,
                      },
                      data: {
                        stages: addScore.stages,
                      },
                    });
                    cache.writeQuery({
                      query: GET_PLAYER_ACHIEVEMENTS,
                      variables: { player: player.user.userdetailid },
                      data: {
                        players: [
                          {
                            achievements: addScore.player.achievements,
                            badges: addScore.player.badges,
                          },
                        ],
                      },
                    });
                    cache.writeQuery({
                      query: GET_COURSE_BY_PLAYER,
                      variables: { playerid: player.user.userdetailid },
                      data: {
                        players: [{ course: addScore.player.course }],
                      },
                    });
                  }}
                >
                  {addScore => (
                    <SiswaCourseValidator
                      stages={stages}
                      life={player.gameplay.life}
                      gameOver={(score, life) => {
                        const starCount = calculateStars(
                          player.gameplay.currentTimer,
                          stages[0].time,
                          life,
                        );
                        if (life > 0) {
                          player.addExp(stages[0].exp_reward);
                          const addScoreData = {
                            variables: {
                              player: player.user.player._id,
                              course: stages[0].course._id,
                              stage: stageid,
                              score,
                              time: player.gameplay.currentTimer,
                              stars: starCount,
                              script,
                            },
                          };
                          const process = async function() {
                            if (
                              stages[0].index === stages[0].course.stages.length
                            ) {
                              await player.giveAchievement(
                                '5c26270a8c56d9072422e3ee',
                              );
                              if (stages[0].course.badge) {
                                await player.addBadge(
                                  stages[0].course.badge._id,
                                );
                              }
                            }
                            const result = await addScore(addScoreData);
                            player.updateStars(
                              result.data.addScore.player.stars,
                            );
                          };
                          process();
                        }
                        setIsPlay(false);
                        setLifeResult(life);
                        setScoreResult(score);
                        setShowModal(true);
                        setStars(starCount);
                        clearInterval(interval);
                      }}
                    >
                      {({ result }) => (
                        <>
                          <div className="row flex-xl-nowrap">
                            { stages[0].type === 'QUIZ' ?
                              <Quiz index={indexQuestion} stage={stages[0]} life={player.gameplay.life} onNextQuestion={() => {
                                setIndexQuestion(indexQuestion+1);
                              }} onFinish={(score) => {
                                const starCount = calculateStars(
                                  player.gameplay.currentTimer,
                                  stages[0].time,
                                  player.gameplay.life,
                                );
                                setIsPlay(false);
                                setLifeResult(player.gameplay.life);
                                setScoreResult(score);
                                setShowModal(true);
                                setStars(starCount);
                                clearInterval(interval);
                                if (player.gameplay.life > 0) {
                                  player.addExp(stages[0].exp_reward);
                                  const addScoreData = {
                                    variables: {
                                      player: player.user.userdetailid,
                                      course: stages[0].course._id,
                                      stage: stageid,
                                      score,
                                      time: player.gameplay.currentTimer,
                                      stars: starCount,
                                      script : '',
                                    },
                                  };
                                  const process = async function() {
                                    if (
                                      stages[0].index === stages[0].course.stages.length
                                    ) {
                                      await player.giveAchievement(
                                        '5c26270a8c56d9072422e3ee',
                                      );
                                      if (stages[0].course.badge) {
                                        await player.addBadge(
                                          stages[0].course.badge._id,
                                        );
                                      }
                                    }
                                    const result = await addScore(addScoreData);
                                    player.updateStars(
                                      result.data.addScore.player.stars,
                                    );
                                  };
                                  process();
                                }
                              }}   onWrongChoice={(score) => {
                                if(player.gameplay.life <= 1){
                                  //IKI PODO PLEK KARO SENG NDEK DUKUR
                                  const starCount = calculateStars(
                                    player.gameplay.currentTimer,
                                    stages[0].time,
                                    player.gameplay.life,
                                  );
                                  setIsPlay(false);
                                  setLifeResult(player.gameplay.life);
                                  setScoreResult(score);
                                  setShowModal(true);
                                  setStars(starCount);
                                  clearInterval(interval);
                                  if (player.gameplay.life > 0) {
                                    player.addExp(stages[0].exp_reward);
                                    const addScoreData = {
                                      variables: {
                                        player: player.user.userdetailid,
                                        course: stages[0].course._id,
                                        stage: stageid,
                                        score,
                                        time: player.gameplay.currentTimer,
                                        stars: starCount,
                                        script : '',
                                      },
                                    };
                                    const process = async function() {
                                      if (
                                        stages[0].index === stages[0].course.stages.length
                                      ) {
                                        await player.giveAchievement(
                                          '5c26270a8c56d9072422e3ee',
                                        );
                                        if (stages[0].course.badge) {
                                          await player.addBadge(
                                            stages[0].course.badge._id,
                                          );
                                        }
                                      }
                                      const result = await addScore(addScoreData);
                                      player.updateStars(
                                        result.data.addScore.player.stars,
                                      );
                                    };
                                    process();
                                } }
                                player.setPlayerStatus(player.gameplay.score, player.gameplay.life - 1);
                              }} onCorrectChoice={(score) => {
                                player.setPlayerStatus(score, player.gameplay.life);
                              }}/> : stages[0].type === 'MATERIAL' ?
                                <Material stage={stages[0]} onFinish={() => {
                                  setStage(stages[0]);
                                  setIsPlay(false);
                                  setFromMaterial(true);

                                  player.addExp(/*stages[0].exp_reward*/100);
                                  const addScoreData = {
                                    variables: {
                                      player: player.user.userdetailid,
                                      course: stages[0].course._id,
                                      stage: stageid,
                                      score : 100,
                                      time: player.gameplay.currentTimer,
                                      stars: [true,true,true],
                                      script : '',
                                    },
                                  };
                                  const process = async function() {
                                    if (
                                      stages[0].index === stages[0].course.stages.length
                                    ) {
                                      await player.giveAchievement(
                                        '5c26270a8c56d9072422e3ee',
                                      );
                                      if (stages[0].course.badge) {
                                        await player.addBadge(
                                          stages[0].course.badge._id,
                                        );
                                      }
                                    }
                                    const result = await addScore(addScoreData);
                                    player.updateStars(
                                      result.data.addScore.player.stars,
                                    );
                                  };
                                  process();
                                }} />
                                  : <Coding interactive={interactive} reset={reset} result={result} editorId={editorId} stage={stages[0]} onScriptChange={(val) => {
                                script = val;
                              }} />
                            }
                          </div>
                          <SiswaCourseFooter
                            course={stages[0].course}
                            stage={stages[0]}
                            history={history}
                            onMenuClick={() => {
                              setSidebarOpen(true);
                            }}
                          />
                          <SiswaCourseScoreBoard
                            show={showModal}
                            stars={stars}
                            timer={player.gameplay.timerText}
                            life={lifeResult}
                            score={scoreResult}
                            stage={stages[0]}
                            exp={stages[0].exp_reward}
                            onReset={() => {
                              reset();
                            }}
                          />
                        </>
                      )}
                    </SiswaCourseValidator>
                  )}
                </Mutation>
              </main>
              <OutOfEnergyModal
                history={history}
                courseid={stages[0].course._id}
                show={showOutOfEnergy}
              />

              <PreventNavigationDialog
                when={isPlay}
                title="Peringatan"
                message={
                  <strong>
                    Progress anda akan hilang, apakah anda yakin ingin keluar ?
                  </strong>
                }
                history={history}
              />
              { stages[0].type === 'PROGRAMMING' &&  <Tour
                steps={tour}
                isOpen={tourOpen}
                lastStepNextButton={
                  <button type="button" className="btn btn-primary">
                    Done! Happy Coding!
                  </button>
                }
                onRequestClose={() => {
                  setTourOpen(false);
                  if (player.user.player.tutorial) {
                    player.setTutorial(false, 0);
                  }
                }}
              /> }

            </>
          );
        }}
      </Query>


    </Container>
  );
};

Course.propTypes = {
  match: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

export default Course;
