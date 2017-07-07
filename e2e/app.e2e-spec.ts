import { AngularNon1TestFirstKataPage } from './app.po';

describe('angular-non1-test-first-kata App', () => {
  let page: AngularNon1TestFirstKataPage;

  beforeEach(() => {
    page = new AngularNon1TestFirstKataPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
