import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import featuresBackground from '../../assets/images/features_background.png';
import codingIcon from '../../assets/images/coding.png';
import gamificationIcon from '../../assets/images/gamification.png';
import socialIcon from '../../assets/images/social.png';
import illustration from '../../assets/images/Illustration.svg';
import newsletterBackground from '../../assets/images/newsletter_background.png';
import instagram from '../../assets/images/instagram.png';
import twitter from '../../assets/images/twitter.png';
import facebook from '../../assets/images/facebook.png';
import Logo from '../../components/UI/Logo';

const WebLanding = ({ className }) => (
  <div className={classnames('container-fluid', className)}>
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="#">
        <Logo />
      </a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item daftar">
            <Link className={classnames(className, 'nav-link')} to="/register">
              Daftar
            </Link>
          </li>
          <li className="nav-item ">
            <Link
              className={classnames(className, 'btn btn-primary', 'btn-circle')}
              to="/login"
            >
              Masuk
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    <div id="main">
      <img height={280} src={illustration} alt="illustration" />
      <h2>Cara baru untuk belajar pemrograman</h2>
      <p>Selesaikan semua Tantangan dan jadilah yang Teratas</p>
      <p>Suka bermain Game, Pasti jago disini</p>
      <Link className="btn btn-primary btn-circle btn-start" to="/register">
        Mulai
      </Link>
    </div>
    <div id="features" className="row">
      <div className="col-12">
        <div className="row justify-content-md-center">
          <h2>Kenapa KodeKurawal</h2>
        </div>
        <div className="row justify-content-md-center">
          <div className="feature col-3">
            <img src={gamificationIcon} alt="" />
            <h3>Gamification</h3>
            <p>
              Belajar pemrograman dengan menggunakan mekanisme bermain game,
              sehingga proses belajar tidak lagi membosankan
            </p>
          </div>
          <div className="feature col-3">
            <img src={socialIcon} alt="" />
            <h3>Social</h3>
            <p>
              Belajar pemrograman dengan menggunakan mekanisme bermain game,
              sehingga proses belajar tidak lagi membosankan
            </p>
          </div>
          <div className="feature col-3">
            <img src={codingIcon} alt="" />
            <h3>Real Coding</h3>
            <p>
              Belajar pemrograman dengan menggunakan mekanisme bermain game,
              sehingga proses belajar tidak lagi membosankan
            </p>
          </div>
        </div>
      </div>
    </div>
    <div id="newsletter" className="row">
      <div className="col-4 offset-1">
        <h3>Berlangganan Informasi KodeMaster Melalui Email</h3>
        <p>
          Jangan sampai kamu melewatkan informasi penting tentang KodeKurawal.
          Kamu bisa berlangganan Newsletter KodeKurawal dengan cara mengisi
          formulir di samping.
        </p>
      </div>
      <div className="col-5 offset-1">
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Nama</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Ketikkan nama anda.."
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Ketikkan nama anda.."
                />
              </div>
              <input
                type="submit"
                className="btn btn-primary"
                value="Berlangganan Newsletter"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
    <div id="footer">
      <div className="row">
        <div className="d-flex">
          <ul className="nav mr-auto">
            <li className="nav-item">
              <a className="nav-link " href="#">
                Tentang Kami
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pelajari Lanjut
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Blog
              </a>
            </li>
          </ul>
          <div className="socmed ml-auto">
            <img src={instagram} alt="" />
            <img src={twitter} alt="" />
            <img src={facebook} alt="" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex" />
        <p className="mr-auto copyright">
          © 2019 kodekurawal. All rights reserved
        </p>
        <p className="ml-auto email">admin@kodekurawal.com</p>
      </div>
    </div>
  </div>
);

WebLanding.propTypes = {
  className: PropTypes.any.isRequired,
};

const styledLayout = styled(WebLanding)`
  background-color: white;
  color: #242223;
  font-family: open sans;
  #features {
    background-image: url(${featuresBackground});
    background-size: cover;
    padding-top: 100px;
    padding-bottom: 50px;
    background-position: top;
  }

  #newsletter {
    background-color: #393939;
    padding-top: 150px;
    background-image: url(${newsletterBackground});
    padding-bottom: 200px;
    background-position: bottom;
    background-size: cover;
  }
  #newsletter h3 {
    margin-bottom: 30px;
    margin-top: 30px;
  }
  #main {
    text-align: center;
    padding-bottom: 80px;
  }
  #features h2 {
    color: white;
  }
  #main p {
    margin-bottom: 5px;
    color: #888888;
    font-size: 1rem;
    font-weight: 600;
  }
  #main p span {
    color: #4891e3;
  }
  h2 {
    font-weight: bold;
  }
  #main h2 {
    margin-top: 20px;
  }
  #footer {
    background-color: white;
    padding: 10px 20px;
  }
  #footer img {
    height: 30px;
    padding: 5px;
  }
  .btn-circle {
    border-radius: 100px !important;
    padding-left: 50px;
    padding-right: 50px;
    font-weight: bold;
  }
  .btn-primary {
    background-color: #4891e3 !important;
    border-color: #4891e3 !important;
  }
  .feature {
    padding: 10px;
    margin-top: 50px;
  }
  #footer .row .d-flex {
    width: 100%;
  }
  .feature img {
    width: 220px;
    margin: 0 auto;
    display: block;
  }

  .feature h3,
  .feature p {
    text-align: center;
    width: 100%;
    font-size: 1rem;
    color: white;
  }
  .feature h3 {
    font-weight: bold;
    font-size: 1.3rem;
    margin-bottom: 5px;
    margin-top: 20px;
  }

  #newsletter p {
    text-align: left;
    color: white;
  }
  h3 {
    color: white;
  }
  #footer {
    background-color: white;
  }

  #newsletter .card {
    background-color: #5a5a5a;
  }
  #newsletter label {
    color: white;
  }
  #newsletter form input[type='submit'] {
    display: block;
    width: 100%;
    margin-top: 30px;
  }
  .email,
  .copyright {
    color: #b2b2b2;
    font-size: 0.8rem;
  }
  .copyright {
    padding-left: 1rem;
  }
  .daftar {
    color: #4891e3;
    font-weight: 600;
    font-size: 1rem;
    margin-right: 20px;
  }
  .btn-start {
    margin-top: 20px;
    font-size: 1rem;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

export default styledLayout;
