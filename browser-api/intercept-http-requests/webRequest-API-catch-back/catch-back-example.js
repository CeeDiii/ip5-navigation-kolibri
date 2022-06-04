let history = [];

function blockBack(requestDetails) {
    let page, requestUrl;
    if(requestDetails.frameType === "outermost_frame") {
        requestUrl = requestDetails.url
        if(requestUrl.indexOf('?') > 0) {
            page = requestUrl.substring(0, object.indexOf('?'));
        } else {
            page = requestUrl;
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
        urls:  ["<all_urls>"],
        types: ["main_frame"],
    },
    ["blocking"]
)
