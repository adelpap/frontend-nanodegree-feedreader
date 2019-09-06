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

    //  test suite for the RSS feeds
    describe('RSS Feeds', function() {
        // checks if all feeds are defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // checks if all the feeds have defined and not empty URLs
        it('have defined urls', function() {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        // checks if all feeds have a not empty and defined name
        it('have defined names', function() {
            for(const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    // test suite that checks the menu functionality
    describe('The menu', function() {
        const body = document.querySelector('body');

        // checks if the menu is hidded by default
        // it expects the body element to have the menu-hidden class
        // since this class is hiding it
        it('is hidden by default', function() {
            expect(body).toHaveClass('menu-hidden');
        });

        // checks if by clicking the menu it changes visibility
        it('changes visibility when menu icon is clicked', function() {
            const menuIcon = document.querySelector('.menu-icon-link');
            const body = document.querySelector('body');

            // we click the menu icon here and expect the menu to appear
            menuIcon.click();
            expect(body).not.toHaveClass('menu-hidden');

            // we click the menu icon again and expect the menu to hide
            menuIcon.click();
            expect(body).toHaveClass('menu-hidden');
        });
    });

    // test suite that checks the initial entries of the feed container after the loadFeed function is called
    describe('Initial Entries', function() {
        // we need to run the loadFeed function before we can check for the feed enrtries
        // the loadFeed function is asynchronous so we have to use beforeEach() and done() functions
        // to let it run and finish its run before we do the checking
        beforeEach(function(done) {
            // done is passed in loadFeed since loadFeed supports a callback as the second parameter
            // which will be called after everything has run successfully.
            loadFeed(0, done);
        });

        // checks if the feed container has at least one entry
        it('should have at least a single entry', function() {
            const feedEntries = document.querySelectorAll('.feed .entry');
            console.log(feedEntries);
            expect(feedEntries).not.toBe(0);
        });
    });

    // test suite that checks if the feed is changing when we call loadFeed() more than once
    describe('New Feed Selection', function() {
        let initialFeed;

        // again we use beforeEach() and done() because loadFeed is asynchronous
        beforeEach(function(done) {
            // we call loadFeed and get an initial feed
            loadFeed(0);
            firstFeed = document.querySelector('.feed').textContent;
            // then we call loadFeed again with a different parameter and let it be done
            loadFeed(1, done);
        });

        // checks if the feed has changed content after we have ran loadFeed() twice
        it('changes content', function() {
            // we get the new feed and check if it has the same content as the initial one
            const newFeed = document.querySelector('.feed').textContent;
            expect(firstFeed).not.toBe(newFeed);
        });
    });

}());