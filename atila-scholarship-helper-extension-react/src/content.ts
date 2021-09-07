import { RequestMessage, ResponseMessage } from "./models/ExtensionMessage";
import { Scholarship } from "./models/Scholarship";
import { Utils } from "./services/Utils";

export {}

chrome.runtime.onMessage.addListener((message: RequestMessage, sender, sendResponse) => {
  switch (message.type) {
    case "LOAD_PARENT_PAGE":
      const scholarship = loadParentPageData();
      const responseMessage: ResponseMessage = {data: { scholarship }};
      sendResponse(responseMessage);
      break;
    default:
      break;
  }
});

const loadParentPageData = () => {

  let scholarship =  new Scholarship();
  scholarship = {
    ...scholarship,
    name: document.title,
    scholarship_url: document.URL,
    description: getContentDescription(),
}

  return scholarship;
};

/**
 * Return the first one that contains a valid string
 * TODO: A future implementation might use an API to parse or summarize the page content
 */
 function getContentDescription() {

  const potentialQuerySelectors = [
      "meta[itemprop='description']",
      "meta[property='og:description']",
      "meta[name='twitter:description']",
  ]

  let description = "";

  for (const querySelector of potentialQuerySelectors) {
      if (document.querySelector(querySelector)?.getAttribute('content')) {
          description = document.querySelector(querySelector)?.getAttribute('content') ?? "";
          return description;
      }
  }

  return description;

}