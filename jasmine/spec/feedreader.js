/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });
  });

  /* Write a test that loops through each feed
   * in the allFeeds object and ensures it has a URL defined
   * and that the URL is not empty.
   */
  describe('URL', function() {
    it('is definded and not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });
    /* Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it("has a name and it's not empty", function() {
      var x = 0;
      for (allFeeds[x]; x < 4; x++) {
        expect(allFeeds[x].name).toBeDefined();
        expect(allFeeds[x].name.length).not.toBe(0);
      }
    });
  });

  /* Write a new test suite named "The menu" */
  describe('The menu', function() {
    var body = $('body');
    var icon = $('.menu-icon-link');
    /* Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('element is hidden by default', function() {
      expect(body.hasClass('menu-hidden')).toBe(true);
    });

    /* Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('changes visibility when the menu icon is clicked', function() {
      var presentClass = body.attr('class');
      var newClass = (body.hasClass('menu-hidden')) ? '' : 'menu-hidden';

      icon.click();
      expect(body.attr('class')).toBe(newClass);

      icon.click();
      expect(body.attr('class')).toBe(presentClass);

    });
  });

  /* Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });
    /* Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    it('ensures when the loadFeed() is called,it has at least one .entry element', function() {
      var entries = $('.feed .entry').length;
      expect(entries).toBeGreaterThan(0);
    });
  });

  /* Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    var feed;
    beforeEach(function(done) {
      feed = $('.feed').html();
      loadFeed(1, function() {
        done();
      });
    });
    /* Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('changes when a new feed is loaded', function(done) {
      var newFeed = $('.feed').html();
      expect(feed).not.toBe(newFeed);
      done();
    });
  });
}());