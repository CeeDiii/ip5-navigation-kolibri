let history = [];

function blockBack(requestDetails) {
    let page, object;
    if(requestDetails.frameType === "outermost_frame") {
        object = requestDetails.url
        if(object.indexOf('?') > 0) {
            page = object.substring(0, object.indexOf('?'));
        } else {
            page = object;
        }
        if (history.includes(page)) {
            return{
                redirectUrl: "https://www.google.com"
            };
        } else {
            history.push(page);
        }
        return;
    }
}

chrome.webRequest.onBeforeRequest.addListener(
    blockBack,
    {
        urls: ["<all_urls>"],
        types: ["main_frame"],
    },
    ["blocking"]
)

//text/html;charset=UTF-8