/// <reference types="react-scripts" />
declare var bootstrap: typeof any;
declare global {
  interface Window {
    chrome: any;  // this will be your variable name
  }
}