import React from 'react';
import CodeSnippet from './CodeSnippet'; // Assuming you have a CodeSnippet component for code blocks

const HowToPlaySection = () => {
  return (
    <section id="how-to-play" className="section">
      <h1>How to Play</h1>

      <div className="how-to-play-step">
        <h3>Starting a Game</h3>
        <p>Click on the "Play" button to start a new game.</p>
        <CodeSnippet language="javascript">
          {`
          // Example frontend interaction to start a game
          const handlePlay = () => {
              // Code to handle starting a game
          }
          `}
        </CodeSnippet>
      </div>

      <div className="how-to-play-step">
        <h3>Joining a Game</h3>
        <p>Share the room name and code with your friend.</p>
        <CodeSnippet language="javascript">
          {`
          // Example frontend interaction to join a game
          const handleJoinGame = (roomName, code) => {
              // Code to join the game with provided roomName and code
          }
          `}
        </CodeSnippet>
      </div>

      <div className="how-to-play-step">
        <h3>Game Setup</h3>
        <p>The first player to join the room will be assigned as "O" (Circle).</p>
        <p>The second player to join will be assigned as "X" (Cross).</p>
        <CodeSnippet language="javascript">
          {`
          // Example logic to assign symbols based on joining order
          const assignSymbols = (players) => {
              // Logic to determine player symbols (O or X)
          }
          `}
        </CodeSnippet>
      </div>

      <div className="how-to-play-step">
        <h3>Gameplay</h3>
        <p>Players take turns to place their symbol ("O" or "X") on the 3x3 grid.</p>
        <p>The goal is to get three of your symbols in a row, column, or diagonal.</p>
        <CodeSnippet language="javascript">
          {`
          // Example frontend interaction for gameplay mechanics
          const handleMove = (row, col) => {
              // Code to handle player moves on the board
          }
          `}
        </CodeSnippet>
      </div>

      <div className="how-to-play-step">
        <h3>Chat Functionality</h3>
        <p>Click on the chat icon located in the top right corner of the game screen.</p>
        <p>A chat box will appear where players can exchange messages.</p>
        <p>Messages sent by the current player will be aligned to the right side.</p>
        <p>Messages sent by the opponent will be aligned to the left side.</p>
        <CodeSnippet language="javascript">
          {`
          // Example frontend implementation of chat functionality
          const sendMessage = (message) => {
              // Code to send a message in the chat
          }
          `}
        </CodeSnippet>
      </div>

      <div className="how-to-play-step">
        <h3>Ending the Game</h3>
        <p>The game ends when one player achieves three symbols in a row, column, or diagonal, or if the board is full with no winner (draw).</p>
        <CodeSnippet language="javascript">
          {`
          // Example logic to determine game end conditions
          const checkGameEnd = (board) => {
              // Code to check if there's a winner or if it's a draw
          }
          `}
        </CodeSnippet>
      </div>

      <div className="how-to-play-step">
        <h3>Exiting the Room</h3>
        <p>Click on the delete icon located in the top right corner of the game screen.</p>
        <p>The room will be deleted and both of you will be out of the game.</p>
        <CodeSnippet language="javascript">
          {`
          // Example logic to delete a room
          const deleteRoom = (room) => {
              // Code to delete a room
          }
          `}
        </CodeSnippet>
      </div>

    </section>
  );
};

export default HowToPlaySection;