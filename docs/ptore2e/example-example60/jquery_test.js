describe("", function() {
  var rootEl;
  beforeEach(function() {
    rootEl = browser.rootEl;
    browser.get("docs/examples/example-example60/index-jquery.html");
  });
  
it('should check ng-bind', function() {
  var nameInput = element(by.model('name'));

  expect(element(by.binding('name')).getText()).toBe('Whirled');
  nameInput.clear();
  nameInput.sendKeys('world');
  expect(element(by.binding('name')).getText()).toBe('world');
});
});