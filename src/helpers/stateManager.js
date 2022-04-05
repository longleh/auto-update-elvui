export const APP_STATES = {
    LOADING: 'loading',
    CONFIGURATION: 'configuration',
    INSTALLATION: 'installation'
}

export const loadWindowByState = (state, win) => {
  switch (state) {
    case APP_STATES.LOADING:
      win.loadFile('./view/loading/index.html')
      break;
    case APP_STATES.CONFIGURATION:
      win.loadFile('./view/configuration/index.html')
      break;
    default:
      win.loadFile('./view/index.html')
  }

}

let _currentState = APP_STATES.LOADING

export const stateManager = (window) => ([_currentState, (newState) => {
    _currentState = newState
    loadWindowByState(_currentState, window)
    return _currentState
}])