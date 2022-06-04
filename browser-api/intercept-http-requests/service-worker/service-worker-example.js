self.addEventListener('fetch', function(event) {
    console.log(event.request.url)
    if (event.request.url.includes('page1')) {
        event.respondWith(
            new Response('<p>This is my fancy page 1</p>', {
                headers: { 'Content-Type': 'text/html' }                          
            })
        );
    } else if (event.request.url.includes('page2')) {
        event.respondWith(
            new Response('<p>This is my ugly page 2</p>', {
                headers: { 'Content-Type': 'text/html' }                          
            })
        );
    } else {
        event.respondWith(
            new Response('<h1>Welcome back to the navigation</h1>' +     
                            '<p>'+
                                '<a href="page1">'+
                                    'Nav-Link 1'+
                                '</a>'+
                                '<br>'+
                                '<a href="page2">'+
                                    'Nav-Link 2'+
                                '</a>'+
                            '</p>', {
                
                                headers: { 'Content-Type': 'text/html' }
            })
        );
    }                                             
});