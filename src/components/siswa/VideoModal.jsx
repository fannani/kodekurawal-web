import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Modal from 'react-bootstrap4-modal';

const VideoModal = ({ showModal, onClose, onEnd }) => {
  const [player, setPlayer] = useState(false);

  useEffect(
    () => {
      if (player && showModal) {
        player.playVideo();
      }
    },
    [showModal],
  );
  const onReady = event => {
    setPlayer(event.target);
  };

  return (
    <Modal
      dialogClassName="modal-lg"
      visible={showModal}
      onClickBackdrop={() => {
        player.stopVideo();
        onClose();
      }}
    >
      <div className="modal-header">
        <h5 className="modal-title">Menambah Energy</h5>
      </div>
      <div className="modal-body">
        <div style={{ textAlign: 'center' }}>
          <YouTube
            videoId="zj7WTlL2YlU"
            onReady={onReady}
            onEnd={() => {
              onEnd();
              onClose();
            }}
            opts={{
              playerVars: { rel: 0, controls: 0 },
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default VideoModal;
