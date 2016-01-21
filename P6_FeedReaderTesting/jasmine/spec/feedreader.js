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

        it('have none empty URLs', function() {
            var urlsAllGood = true;

            allFeeds.forEach(function(feed) {
             if (!Boolean(feed.url)) {
               urlsAllGood = false;
             }
            });

            expect(urlsAllGood).toBe(true);
        });

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

    describe('The menu', function() {

        it('is hidden by default', function() {
        // Do nothing when the DOM is prepared, and
        // Check that when class="menu-hidden slide-menu" is applied to the element it is set with properties that hide it
            expect($('.menu-hidden .slide-menu').css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
        });

        it('is shown when the hamburger icon is clicked, and is hidden again when clicked again', function() {

            // Testing the functions combined
            // Click and see if the sidebar comes out
            jsmMenuIcon.click();
            expect($('body').hasClass('')).toBe(true);

            // Slide back and hide again
            jsmMenuIcon.click();
            expect($('.menu-hidden .slide-menu').css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
         });

         it('there is at least a single .entry element within the .feed container', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
         });
    });

    describe('New Feed Selection', function() {
        var feedContent;

        beforeEach(function(done) {

            loadFeed(1, function() {
                feedContent = $('.feed').html();
                done();
            });
        });

        it('when a new feed is loaded, the content actually changes', function(done) {

            loadFeed(2, function() {
                expect(feedContent).not.toEqual($('.feed').html());
                done();
            });
        });
    });
}());
