import React from 'react';
import styled from 'styled-components';
import GamePanel from './GamePanel';
import TypedShell from './TypedShell';

const Container = styled.div`
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-weight: 300;
  width: 100%;
  position: relative;
  background-color: rgb(18 18 18/1);
`;

const VerticallyCenterChildren = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const App = (): JSX.Element => (
  <Container>
    <VerticallyCenterChildren>
      <GamePanel />
    </VerticallyCenterChildren>
  </Container>
);

export default App;
