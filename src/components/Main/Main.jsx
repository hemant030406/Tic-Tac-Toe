import React, { useEffect } from 'react'
import './Main.css'
import { SlDocs } from "react-icons/sl";
import { FaPlay } from "react-icons/fa";
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import Fetch from '../Fetch/Fetch';
import { URL } from '../Utils/Utils';
import { FaGithub } from "react-icons/fa6";

const Main = () => {

  let navigate = useNavigate();

  const authenticate = async () => {
    let data = await Fetch(URL + 'auth', null, 'GET')
    if (data.ok) {
      console.log('ok')
      navigate(`/room/${data['data'].username}/${data['username']}`)
    }
  }

  useEffect(() => {
    authenticate()
  }, [])

  return (
    <div className='main'>
      <Nav icons={false} color={'transparent'} />
      <div className='main-overlay'>
        <div className='main-content'>
          <div className='main-text'>
            <h1>Hey there, welcome back!</h1>
            <h2>Are you a seasoned visitor? Let's jump into the game!</h2>
            <h2>New to our world? Read the instructions carefully to get the hang of things!</h2>
          </div>
          <div className='main-buttons'>
            <div className='main-instrs main-button' onClick={() => navigate('/docs')}>
              <SlDocs />
              <p style={{ margin: '0' }}>Docs</p>
            </div>
            <div className='main-play main-button' onClick={() => navigate('/room')}>
              <FaPlay />
              <p style={{ margin: '0' }}>Play</p>
            </div>
            <a target='blank' href='https://github.com/hemant030406/Tic-Tac-Toe/' style={{textDecoration:'none'}}>
              <div className='main-git main-button'>
                <FaGithub size={20} />
                <p style={{ margin: '0' }}>Github</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
