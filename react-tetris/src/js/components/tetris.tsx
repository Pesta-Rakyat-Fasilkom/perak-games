import React from 'react';
import { Context } from '../context';
import { KeyboardMap, useKeyboardControls } from '../hooks/useKeyboardControls';
import * as Game from '../models/Game';
import Gameboard from './gameboard';
import HeldPiece from './held-piece';
import PieceQueue from './piece-queue';

type RenderFn = (params: {
  HeldPiece: React.ComponentType;
  Gameboard: React.ComponentType;
  PieceQueue: React.ComponentType;
  points: number;
  linesCleared: number;
  level: number;
  state: Game.State;
  controller: Controller;
}) => React.ReactElement;

type Controller = {
  pause: () => void;
  resume: () => void;
  hold: () => void;
  hardDrop: () => void;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  flipClockwise: () => void;
  flipCounterclockwise: () => void;
  restart: () => void;
};

export type StateChange = 'STATE' | 'POINTS' | 'LINES';

type Props = {
  keyboardControls?: KeyboardMap;
  onStateChange?: (arg0: StateChange, arg1: string | number) => void;
  onPointChange?: (arg0: number) => void;
  children: RenderFn;
};

const defaultKeyboardMap: KeyboardMap = {
  down: 'MOVE_DOWN',
  left: 'MOVE_LEFT',
  right: 'MOVE_RIGHT',
  space: 'HARD_DROP',
  z: 'FLIP_COUNTERCLOCKWISE',
  x: 'FLIP_CLOCKWISE',
  up: 'FLIP_CLOCKWISE',
  p: 'TOGGLE_PAUSE',
  c: 'HOLD',
  shift: 'HOLD'
};

window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}, false);

// https://harddrop.com/wiki/Tetris_Worlds#Gravity
const tickSeconds = (level: number) =>
  (0.8 - (level - 1) * 0.007) ** (level - 1);

export default function Tetris(props: Props): JSX.Element {
  const [game, dispatch] = React.useReducer(Game.update, Game.init());
  const keyboardMap = props.keyboardControls ?? defaultKeyboardMap;
  const level = Game.getLevel(game);

  useKeyboardControls(keyboardMap, dispatch);

  React.useEffect(() => {
    let interval: number | undefined;
    if (game.state === 'PLAYING') {
      interval = window.setInterval(() => {
        dispatch('TICK');
      }, tickSeconds(level) * 1000);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [game.state, level]);

  React.useEffect(() => {
    if (props.onStateChange) {
      props.onStateChange('STATE', game.state);
    }
  }, [game.state]);

  React.useEffect(() => {
    if (props.onStateChange) {
      props.onStateChange('LINES', game.lines);
    }
    if (props.onPointChange) {
      props.onPointChange(game.points);
    }
  }, [game.lines]);

  const controller = React.useMemo(
    () => ({
      pause: () => dispatch('PAUSE'),
      resume: () => dispatch('RESUME'),
      hold: () => dispatch('HOLD'),
      hardDrop: () => dispatch('HARD_DROP'),
      moveDown: () => dispatch('MOVE_DOWN'),
      moveLeft: () => dispatch('MOVE_LEFT'),
      moveRight: () => dispatch('MOVE_RIGHT'),
      flipClockwise: () => dispatch('FLIP_CLOCKWISE'),
      flipCounterclockwise: () => dispatch('FLIP_COUNTERCLOCKWISE'),
      restart: () => dispatch('RESTART')
    }),
    [dispatch]
  );

  return (
    <Context.Provider value={game}>
      {props.children({
        HeldPiece,
        Gameboard,
        PieceQueue,
        points: game.points,
        linesCleared: game.lines,
        state: game.state,
        level,
        controller
      })}
    </Context.Provider>
  );
}
