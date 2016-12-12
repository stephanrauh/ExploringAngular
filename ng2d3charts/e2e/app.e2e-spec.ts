import { Ng2d3chartsPage } from './app.po';

describe('ng2d3charts App', function() {
  let page: Ng2d3chartsPage;

  beforeEach(() => {
    page = new Ng2d3chartsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
