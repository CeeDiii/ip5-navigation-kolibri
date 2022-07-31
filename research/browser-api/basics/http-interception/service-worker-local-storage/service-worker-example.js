self.addEventListener('fetch', function(event) {

    if (event.request.url.includes('page1')) {
        event.respondWith(
            new Response('<p>This is my fancy page 1</p><script src="state-test.js"></script>', {
                headers: {'Content-Type': 'text/html'}
            })
        );
    } else if (event.request.url.includes('page2')) {
        event.respondWith(
            new Response('<p>This is my ugly page 2</p><script src="state-test.js"></script>', {
                headers: {'Content-Type': 'text/html'}
            })
        );
    }
});