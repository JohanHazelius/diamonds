import { delay } from 'redux-saga'
import { put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios'

import * as actionTypes from './constants/actionTypes'

function* pollForUpdates() {
    // while(true) {
        //yield delay(1000);
        //getting bots, diamonds from api
        const boardId = 1;
        const board = yield call(axios.get, `api/boards/${boardId}`);

        const newGameboard = {
          bots: board.data.bots,
          diamonds: board.data.diamonds,
          boardId: board.data.boardId,
          width: 10,
          height: 10
        }

        yield put({type: actionTypes.BOARD_UPDATE_RECEIVED, gameboard: newGameboard})
    // }
}

export function* updateSaga() {
    yield takeEvery(actionTypes.REQUEST_BOARD_UPDATE, pollForUpdates);
}

function* pollForHighscores() {

//   while(true) {
      //yield delay(10000);

  const player = yield call(axios.get, 'api/highscore');
  const newHighscores = player.data;


    yield put({type: actionTypes.HIGHSCORE_UPDATE_RECEIVED, highscores: newHighscores});
//   }
}

export function* highscoreSaga() {
    yield takeEvery(actionTypes.REQUEST_HIGHSCORE_UPDATE, pollForHighscores)
}
