import { RequestMessage, ResponseMessage } from "./models/ExtensionMessage";
import { Scholarship } from "./models/Scholarship";
import { BlogContent } from "./models/BlogContent";

export {}

// Mainly needed for websites with really long meta descriptions in the <head/> usually because of SEO stuffing
// e.g. https://www.codegrepper.com/code-examples/typescript/global+variable+typescript+react
const MAX_DECRIPTION_LENGTH = 750;

chrome.runtime.onMessage.addListener((message: RequestMessage, sender : chrome.runtime.MessageSender, sendResponse : any) => {
  let responseMessage: ResponseMessage;
  switch (message.type) {
    case "LOAD_PARENT_PAGE":
      const scholarship = loadParentPageData();
      responseMessage = {data: { scholarship }};
      sendResponse(responseMessage);
      break;
    case "IMPORT_PAGE_CONTENT":
      loadPageContent(sender).then(blogContent => {
        responseMessage = {data: { blogContent }};
        sendResponse(responseMessage);
      })
      break;
    default:
      break;
  }
});

const loadPageContent = async (sender : chrome.runtime.MessageSender) => {
  let blogContent = new BlogContent();
  blogContent = {
      ...blogContent,
      title: document.title,
      body: document.body.innerHTML,
  }

  console.log(blogContent.body)
  return blogContent;
}

const loadParentPageData = () => {

  let scholarship =  new Scholarship();
  scholarship = {
    ...scholarship,
    name: document.title,
    scholarship_url: document.URL,
    description: getContentDescription().substring(0, MAX_DECRIPTION_LENGTH),
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