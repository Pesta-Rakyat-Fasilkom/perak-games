import React, { useState } from 'react';
import styled from 'styled-components';
import Tetris, { StateChange } from '../src/js/components/tetris';
import CryptoJS from 'crypto-js';
import pako from 'pako';

const Container = styled.div`
  margin: 24px auto 0;
  width: 100%;
  max-width: 376px;
`;

const Score = styled.div`
  position: relative;
  font-family: monospace;
  font-size: 18px;
  color: #888;
`;

const LeftHalf = styled.div`
  display: inline-block;
  width: 50%;
`;

const RightHalf = styled(LeftHalf)`
  text-align: right;
`;

const Column = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const LeftColumn = styled(Column)`
  width: 88px;
`;

const RightColumn = styled(LeftColumn)`
  padding-left: 15px;
`;

const MiddleColumn = styled(Column)`
  width: 200px;
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 12px 24px;
  border-radius: 4px;
  text-align: center;
`;

const Alert = styled.h2`
  color: #666;
  margin: 0;
`;

const Button = styled.button`
  border: 1px solid #666;
  background: none;
  margin-top: 12px;
  border-radius: 4px;
`;

interface EventLog {
  timestamp: number;
  type: StateChange;
  value: string | number;
}

const GamePanel = (): JSX.Element => {
  const [encKey, setEncKey] = useState('default-key');
  const [point, setPoints] = useState(0);
  const [events, setEvents] = useState<EventLog[]>([]);

  React.useEffect(() => {
    console.log(events);
    if (events.length > 0 && events[events.length - 1].value == 'LOST') {
      let ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(events),
        encKey
      ).toString();
      let result = pako.gzip(ciphertext);

      console.log({ score: point, d: result });
      window?.top?.postMessage({ score: point, d: result }, '*');

      setEvents([]);
    }
  }, [events]);

  React.useEffect(() => {
    window.addEventListener('message', (e) => {
      console.log('New message: ' + e.data);
      if (e.data.startsWith('k:')) {
        setEncKey(e.data.split('k:')[1]);
        console.log('Received key: ' + encKey);
      }
      if (e.data == 'reload') window.location.reload();
    });
    window?.top?.postMessage('ready', '*');
  }, []);

  return (
    <Container>
      <Tetris
        onPointChange={(point) => {
          setPoints(point);
        }}
        onStateChange={(state, value) => {
          setEvents([
            ...events,
            {
              timestamp: Date.now() / 1000,
              type: state,
              value: value
            }
          ]);
        }}
      >
        {({
          Gameboard,
          HeldPiece,
          PieceQueue,
          points,
          linesCleared,
          state,
          controller
        }) => (
          <div>
            <div style={{ opacity: state === 'PLAYING' ? 1 : 0.5 }}>
              <Score>
                <LeftHalf>
                  <p>
                    points
                    <br />
                    <Digits>{points}</Digits>
                  </p>
                </LeftHalf>
                <RightHalf>
                  <p>
                    lines
                    <br />
                    <Digits>{linesCleared}</Digits>
                  </p>
                </RightHalf>
              </Score>

              <LeftColumn>
                <HeldPiece />
              </LeftColumn>

              <MiddleColumn>
                <Gameboard />
              </MiddleColumn>

              <RightColumn>
                <PieceQueue />
              </RightColumn>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <button onClick={controller.moveLeft}>left</button>
                  <button onClick={controller.moveRight}>right</button>
                </div>
                <div>
                  <button onClick={controller.flipClockwise}>turn</button>
                  <button onClick={controller.hardDrop}>drop</button>
                </div>
              </div>

              {state === 'PAUSED' && (
                <Popup>
                  <Alert>Paused</Alert>
                  <Button onClick={controller.resume}>Start</Button>
                </Popup>
              )}

              {state === 'LOST' && (
                <Popup>
                  <Alert>Game Over</Alert>
                  <Button onClick={controller.restart}>Start</Button>
                </Popup>
              )}
            </div>
          </div>
        )}
      </Tetris>
    </Container>
  );
};

const Digit = styled.span`
  font-family: monospace;
  padding: 1px;
  margin: 1px;
  font-size: 24px;
`;

type DigitsProps = {
  children: number;
  count?: number;
};
const Digits = ({ children, count = 4 }: DigitsProps): JSX.Element => {
  let str = children.toString();

  while (str.length < count) {
    str = `${0}${str}`;
  }

  return (
    <>
      {str.split('').map((digit, index) => (
        <Digit key={index}>{digit}</Digit>
      ))}
    </>
  );
};

export default GamePanel;
