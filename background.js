const protocolIndex = 0;
const mediumComIndex = 2;

const extensionLinkOfVPN =
  "https://chrome.google.com/webstore/detail/kproxy-extension/gdocgbfmddcfnlnpmnghmjicjognhonm";

chrome.browserAction.onClicked.addListener((activeTab) => {
  let partsOfURL = activeTab.url.split("/");

  let authorPart = partsOfURL.filter((part) => {
    return part.search("@") !== -1;
  })[0];

  if (canNotFindAuthorPart(authorPart)) {
    chrome.tabs.create({
      url: extensionLinkOfVPN,
    });
    return;
  }

  let author = authorPart.substring(1);

  let newURL = "";

  partsOfURL.forEach((part, index) => {
    if (part === authorPart) {
      part = "";
    }

    if (isProtocolIndex(index)) {
      newURL = part + "//";
    } else if (isMediumComIndex(index)) {
      newURL += author + "." + partsOfURL[mediumComIndex] + "/";
    } else {
      newURL += part + "/";
    }
  });

  chrome.tabs.update({
    url: newURL,
  });
});

function isProtocolIndex(index) {
  return index == protocolIndex;
}

function isMediumComIndex(index) {
  return index == mediumComIndex;
}

function canNotFindAuthorPart(authorPart) {
  return !authorPart;
}
