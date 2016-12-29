import { ChartsPage } from './app.po';

describe('charts App', function() {
  let page: ChartsPage;

  beforeEach(() => {
    page = new ChartsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
