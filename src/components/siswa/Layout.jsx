import React, { useState, useEffect } from 'react';
import EnergyModal from './EnergyModal';
import VideoModal from './VideoModal';
import Header from './Header';
import { RouteSiswa } from '../../config/route';
import usePlayer from '../../hooks/player';

const Layout = () => {
  const [showModal, setShowModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const player = usePlayer();

  useEffect(() => {
    player.setPlayMode(false);
  }, []);

  const onAddEnergy = () => {
    setShowModal(true);
  };
  const onLogout = () => {
    player.logout();
  };

  const onClickVideo = () => {
    setShowModal(false);
    setShowVideo(true);
  };

  return (
    <div className="app-container">
      <Header
        play={player.gameplay.play}
        life={player.gameplay.life}
        score={player.gameplay.score}
        time={player.gameplay.timerText}
        logout={onLogout}
        user={player.user}
        isLogin={player.isLogin}
        onAddEnergy={onAddEnergy}
        energy={
          player.user &&
          Object.prototype.hasOwnProperty.call(player.user, 'userdetail')
            ? player.user.userdetail.energy
            : 0
        }
      />

      <RouteSiswa />
      <EnergyModal
        onClickVideo={onClickVideo}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
      <VideoModal
        showModal={showVideo}
        onClose={() => setShowVideo(false)}
        onEnd={() => {
          setShowVideo(false);
          player.addEnergy(300);
        }}
      />
    </div>
  );
};

export default Layout;
