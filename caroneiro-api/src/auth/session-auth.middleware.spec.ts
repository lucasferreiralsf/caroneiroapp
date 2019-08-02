import { SessionAuthMiddleware } from './session-auth.middleware';

describe('SessionAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new SessionAuthMiddleware()).toBeDefined();
  });
});
