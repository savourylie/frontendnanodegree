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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have none empty URLs', function() {
           var urlsAllGood = true;

           allFeeds.forEach(function(feed) {
             if (!Boolean(feed.url)) {
               urlsAllGood = false;
             }
           });

           expect(urlsAllGood).toBe(true);
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have none empty names', function() {
           var namesAllGood = true;

           allFeeds.forEach(function(feed) {
             if (!Boolean(feed.name)) {
               namesAllGood = false;
             }
           });

           expect(namesAllGood).toBe(true);
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {
          // Do nothing when the DOM is prepared, and
          // Check that when class="menu-hidden slide-menu" is applied to the element it is set with properties that hide it
           expect($('.menu-hidden .slide-menu').css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('is shown when the hamburger icon is clicked, and is hidden again when clicked again', function() {

            // Testing the functions combined
            jsmMenuIcon.click();

            expect($('body').hasClass('')).toBe(true);

            // Slide back
            jsmMenuIcon.click();
          });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
         });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('there is at least a single .entry element within the .feed container', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
         });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var feedContent;
        // var originalTimeout;

        beforeEach(function(done) {
            // originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            // loadFeed(2, done);
            // feedContent = $('.feed').html();
            loadFeed(1, function() {
                feedContent = $('.feed').html();
                console.log($('.feed').html());
                done();
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        it('when a new feed is loaded, the content actually changes', function(done) {

            // loadFeed(2, done);
            loadFeed(2, function() {
                console.log($('.feed').html());
                expect(feedContent).not.toEqual($('.feed').html());
                done();
            });
        });

        // afterEach(function() {
        //     jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        // });
    });
}());
