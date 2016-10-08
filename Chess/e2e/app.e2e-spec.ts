import { Ng2chessPage } from './app.po';

describe('ng2chess App', function() {
  let page: Ng2chessPage;

  beforeEach(() => {
    page = new Ng2chessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
