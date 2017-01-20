import { DatatablesPage } from './app.po';

describe('datatables App', function() {
  let page: DatatablesPage;

  beforeEach(() => {
    page = new DatatablesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
