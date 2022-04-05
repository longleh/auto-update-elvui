let _currentStatus = { status: "", message: "" };

export const statusManager = () => [
  _currentStatus,
  (newState) => {
    _currentStatus = newState;
    return _currentStatus;
  },
];

export const resetStatus = () => (_currentStatus = { status: "", message: "" });
