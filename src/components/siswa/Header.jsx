import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PlayerStatus from './PlayerStatus';
import energyImage from '../../assets/images/energy.png';
import Logo from '../UI/Logo.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EnergyDiv = styled.div`
  color: white !important;
  margin-right: 30px;
  z-index: 999;
`;
const EnergyImg = styled.img`
  width: 12px;
`;

const Navigasi = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
`;

const AddButton = styled.button`
  background: none;
  border: none;
  padding: 0px;
  padding-left: 5px;
`;

const Header = ({
  play,
  life,
  score,
  time,
  energy,
  onAddEnergy,
  isLogin,
  user,
  logout,
}) => {
  const playerStatus = play ? (
    <PlayerStatus life={life} score={score} time={time} />
  ) : (
    ''
  );
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark"
      style={{ height: '50px' }}
    >
      <Link to="/dashboard" className="navbar-brand" style={{ zIndex: 999 }}>
        <Logo mode="dark" style={{ marginTop: '0px' }} />
      </Link>

      {playerStatus}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {isLogin ? (
          <>
            {!play ? (
              <Navigasi>
                <ul
                  className="navbar-nav"
                  style={{
                    width: '255px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/course">
                      Course
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/achievement">
                      Achievements
                    </Link>
                  </li>
                  {/*<li className="nav-item">*/}
                  {/*  <Link className="nav-link" to="/friends">*/}
                  {/*    Friends*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                </ul>
              </Navigasi>
            ) : (
              ''
            )}
            {isLogin ? (
              <EnergyDiv className="navbar-text ml-auto">
                <EnergyImg width="20px" src={energyImage} /> : {energy}
                <AddButton onClick={onAddEnergy}>
                  <FontAwesomeIcon
                    color="#FFC149"
                    size="lg"
                    icon="plus-circle"
                  />
                </AddButton>
              </EnergyDiv>
            ) : (
              ''
            )}
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  id="navbarDropdown"
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user.name} <span className="caret" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="/settings">
                    Pengaturan
                  </Link>
                  <button onClick={logout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </>
        ) : (
          ''
        )}
      </div>
    </nav>
  );
};

export default Header;
