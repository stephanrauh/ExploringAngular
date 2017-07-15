import { AsychronousPage } from './app.po';

describe('asychronous App', () => {
  let page: AsychronousPage;

  beforeEach(() => {
    page = new AsychronousPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
