import { BootstrapSideMenuPage } from './app.po';

describe('bootstrap-side-menu App', () => {
  let page: BootstrapSideMenuPage;

  beforeEach(() => {
    page = new BootstrapSideMenuPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
