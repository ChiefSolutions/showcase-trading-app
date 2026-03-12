export const mockOnPanGestureUpdate = jest.fn();
export const mockOnPanGestureEnd = jest.fn();
export const mockOnTapGestureEnd = jest.fn();

export const PanGestureMock = {
  onUpdate: jest.fn(function (cb) {
    mockOnPanGestureUpdate.mockImplementation(cb);
    return this;
  }),
  onEnd: jest.fn(function (cb) {
    mockOnPanGestureEnd.mockImplementation(cb);
    return this;
  }),
};

export const TapGestureMock = {
  onEnd: jest.fn(function (cb) {
    mockOnTapGestureEnd.mockImplementation(cb);
    return this;
  }),
};
