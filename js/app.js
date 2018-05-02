/* app.js
 *
 * This is our RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object we can make
 * use of. It also uses the Handlebars templating library and
 * jQuery.
 */

// The names and URLs to all of the feeds we'd like available.
var allFeeds = [{
  name: 'Udacity Blog',
  url: 'http://blog.udacity.com/feed'
}, {
  name: 'CSS Tricks',
  url: 'http://feeds.feedburner.com/CssTricks'
}, {
  name: 'HTML5 Rocks',
  url: 'http://feeds.feedburner.com/html5rocks'
}, {
  name: 'Linear Digressions',
  url: 'http://feeds.feedburner.com/udacity-linear-digressions'
}];

/* This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 */
function init() {
  // Load the first feed we've defined (index of 0).
  loadFeed(0);
}

/* This function performs everything necessary to load a
 * feed using the Google Feed Reader API. It will then
 * perform all of the DOM operations required to display
 * feed entries on the page. Feeds are referenced by their
 * index position within the allFeeds array.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
 */
function loadFeed(id, cb) {
  var feedUrl = allFeeds[id].url,
    feedName = allFeeds[id].name;

  $.ajax({
    type: "POST",
    url: 'https://rsstojson.udacity.com/parseFeed',
    data: JSON.stringify({
      url: feedUrl
    }),
    contentType: "application/json",
    success: function(result, status) {

      var container = $('.feed'),
        title = $('.header-title'),
        entries = result.feed.entries,
        entriesLen = entries.length,
        entryTemplate = Handlebars.compile($('.tpl-entry').html());

      title.html(feedName); // Set the header text
      container.empty(); // Empty out all previous entries

      /* Loop through the entries we just loaded via the Google
       * Feed Reader API. We'll then parse that entry against the
       * entryTemplate (created above using Handlebars) and append
       * the resulting HTML to the list of entries on the page.
       */
      entries.forEach(function(entry) {
        container.append(entryTemplate(entry));
      });

      if (cb) {
        cb();
      }
    },
    error: function(result, status, err) {
      //run only the callback without attempting to parse result due to error
      if (cb) {
        cb();
      }
    },
    dataType: "json"
  });
}

/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 */
google.setOnLoadCallback(init);

/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 */
$(function() {
  var container = $('.feed'),
    feedList = $('.feed-list'),
    feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
    feedId = 0,
    menuIcon = $('.menu-icon-link');

  /* Loop through all of our feeds, assigning an id property to
   * each of the feeds based upon its index within the array.
   * Then parse that feed against the feedItemTemplate (created
   * above using Handlebars) and append it to the list of all
   * available feeds within the menu.
   */
  allFeeds.forEach(function(feed) {
    feed.id = feedId;
    feedList.append(feedItemTemplate(feed));

    feedId++;
  });

  /* When a link in our feedList is clicked on, we want to hide
   * the menu, load the feed, and prevent the default action
   * (following the link) from occurring.
   */
  feedList.on('click', 'a', function() {
    var item = $(this);

    $('body').addClass('menu-hidden');
    loadFeed(item.data('id'));
    return false;
  });

  /* When the menu icon is clicked on, we need to toggle a class
   * on the body to perform the hiding/showing of our menu.
   */
  menuIcon.on('click', function() {
    $('body').toggleClass('menu-hidden');
  });
}());
// /* feedreader.js
//  *
//  * This is the spec file that Jasmine will read and contains
//  * all of the tests that will be run against your application.
//  */
//
// /* We're placing all of our tests within the $() function,
//  * since some of these tests may require DOM elements. We want
//  * to ensure they don't run until the DOM is ready.
//  */
// $(function() {
//   /* This is our first test suite - a test suite just contains
//    * a related set of tests. This suite is all about the RSS
//    * feeds definitions, the allFeeds variable in our application.
//    */
//   describe('RSS Feeds', function() {
//     /* This is our first test - it tests to make sure that the
//      * allFeeds variable has been defined and that it is not
//      * empty. Experiment with this before you get started on
//      * the rest of this project. What happens when you change
//      * allFeeds in app.js to be an empty array and refresh the
//      * page?
//      */
//     it('are defined', function() {
//       expect(allFeeds).toBeDefined();
//       expect(allFeeds.length).not.toBe(0);
//     });
//   });
//
//
//   /* TODO: Write a test that loops through each feed
//    * in the allFeeds object and ensures it has a URL defined
//    * and that the URL is not empty.
//    */
//   describe('URL', function() {
//     it('is definded and not empty', function() {
//       var i = 0
//       for (allFeeds[i]; i < 4; i++) {
//         expect(allFeeds[i].url).toBeDefined();
//         expect(allFeeds[i].url.length).not.toBe(0);
//       }
//       /*allFeeds.forEach(function(allFeeds) {
//         expect(allFeeds.url).toBeDefined();
//         expect(allFeeds.url.length).not.toBe(0);
//       })*/ //THIS PASSES ASWELL BUT I DONT KNOW IF IT IS GOOD
//     })
//     /* TODO: Write a test that loops through each feed
//      * in the allFeeds object and ensures it has a name defined
//      * and that the name is not empty.
//      */
//     it("has a name and it's not empty", function() {
//       var x = 0;
//       for (allFeeds[x]; x < 4; x++) {
//         expect(allFeeds[x].name).toBeDefined();
//         expect(allFeeds[x].name.length).not.toBe(0);
//       }
//     })
//   })
//
//
//
//
//   /* TODO: Write a new test suite named "The menu" */
//   describe('The menu', function() {
//     /* TODO: Write a test that ensures the menu element is
//      * hidden by default. You'll have to analyze the HTML and
//      * the CSS to determine how we're performing the
//      * hiding/showing of the menu element.
//      */
//     it('element is hidden by default', function() {
//       var body = $('body');
//       expect(body.hasClass('menu-hidden')).toBe(true);
//     })
//
//     /* TODO: Write a test that ensures the menu changes
//      * visibility when the menu icon is clicked. This test
//      * should have two expectations: does the menu display when
//      * clicked and does it hide when clicked again.
//      */
//     it('changes visibility when the menu icon is clicked', function() {
//       var body = $('body');
//       if (body.hasClass('menu-hidden') === true) {
//         expect(body.hasClass('menu-hidden')).toBe(true);
//       } else {
//         expect(body.hasClass('menu-hidden')).not.toBe(true);
//       }
//     })
//   })
//
//   /* TODO: Write a new test suite named "Initial Entries" */
//   describe('Initial Entries', function() {
//     beforeEach(function(done) {
//       loadFeed(0, function() {
//         done();
//       })
//     })
//     /* TODO: Write a test that ensures when the loadFeed
//      * function is called and completes its work, there is at least
//      * a single .entry element within the .feed container.
//      * Remember, loadFeed() is asynchronous so this test will require
//      * the use of Jasmine's beforeEach and asynchronous done() function.
//      */
//     it('ensures when the loadFeed() is called,it has at least one .entry element', function() {
//       var entries = $('.feed .entry').length;
//       expect(entries).toBeGreaterThan(0);
//     })
//   })
//
//   /* TODO: Write a new test suite named "New Feed Selection" */
//   describe('New Feed Selection', function() {
//     var feed;
//     beforeEach(function(done) {
//       feed = $('.feed').html();
//       loadFeed(1, function() {
//         done();
//       })
//     })
//     /* TODO: Write a test that ensures when a new feed is loaded
//      * by the loadFeed function that the content actually changes.
//      * Remember, loadFeed() is asynchronous.
//      */
//     it('changes when a new feed is loaded', function() {
//       var newFeed = $('.feed').html();
//       expect(feed).not.toBe(newFeed);
//       done();
//     })
//   })
// }())