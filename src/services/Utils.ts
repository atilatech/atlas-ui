export class Utils {
    /**
     * @see: https://stackoverflow.com/a/61082536
     * set default time to 11:59PM of current date
     * @returns 
     */
    static currentDateMidnight = () => {
        const now = new Date();
        now.setUTCHours(23,59, 0o0, 0o0);
        const midnight = now.toISOString().slice(0,19);

        return midnight;
    }

    /**
     * @see: https://gist.github.com/gordonbrander/2230317
     * @param maxLength 
     * @returns 
     */
    static getRandomString = (maxLength=16) => {
        let randomString = '';
    
        for (let i =0; i< 4; i++) {
            randomString += Math.random().toString(36).substr(2, 8);
        }
        if (maxLength) {
            randomString = randomString.substring(0, maxLength);
        }
    
        return randomString;
    }

    /**
     * see https://stackoverflow.com/a/50067769/14874841
     * Copies formatted html to clipboard
     * @param str
     */
    static  copyToClipboard = (contentToCopy: string, toastTitle: string, toastBody: string) => {
        const listener = (e: ClipboardEvent) =>  {
            let cleanedContent = Utils.cleanCopiedContent(contentToCopy);

            e?.clipboardData?.setData("text/html", cleanedContent);
            e?.clipboardData?.setData("text/plain", cleanedContent);
            
            e.preventDefault();
            Utils.createCopyToastNotification(toastTitle, toastBody);

        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
    
        
    }
    /**
     * There might be some content that is visible in the HTML but we don't want to copy.
     * @param contentToCopy 
     * @returns 
     */
    static cleanCopiedContent = (contentToCopy: string) => {
        const root = document.createElement('span');

        // We are setting as type Any isntead of HTMlCollectionOf<Element> to allow iterating over each element
        // See: https://stackoverflow.com/a/54755813
        const elementsToRemove: any = root.getElementsByClassName('remove-in-clipboard');
    
        root.innerHTML = contentToCopy;
        for (let element of elementsToRemove) {
            element.innerHTML = "";
        }
        
        return root.innerHTML;
    }

    static truncateText = (inputString: string, maxLength=100, addElipsis = true) => {
        let truncatedText = inputString.substring(0, maxLength);
        let textIsTruncated = inputString.length > truncatedText.length;

        if (textIsTruncated && addElipsis) {
            truncatedText += '...'
        }
        return truncatedText;
    }

    /**
     * Display a toast notification with information about the content that was copied to the clipboard.
     * If multiple toast notifications exist, stack them in the container.
     * @see https://getbootstrap.com/docs/5.0/components/toasts/
     * @param toastTitle 
     * @param toastBody 
     */
    static createCopyToastNotification = (toastTitle: string, toastBody: string) => {
    
    const toastContainerId = "toast-container";

    let toastContainer = document.getElementById(toastContainerId);

    if (!toastContainer) {
        toastContainer = document.createElement("div");
    }
    const toastContainerAttributes = { 
        "class":`${toastContainerId} position-fixed top-0 end-0 p-3`,
        "id": `${toastContainerId}`,
        "styl": "z-index: 11",
    };

    Utils.setAttributes(toastContainer, toastContainerAttributes);

    const toastElementId = `copyToClipBoardToast-${Utils.getRandomString()}`;
    const toastElement = document.createElement("div");

    const toastDelay = 5000; // set to -1 if you want toast notification stay on screen until dismissed
    const toastElementAttributes: any = { 
        "class": "toast mt-3 remove-in-clipboard",
        "role": "alert",
        "aria-live": "polite",
        "aria-atomic": "true",
        "id": toastElementId,
        "data-bs-autohide": toastDelay > 0,
    };

    if (toastElementAttributes["data-bs-autohide"]) {
        toastElementAttributes["data-bs-delay"] = toastDelay;
    } 

    Utils.setAttributes(toastElement, toastElementAttributes);
    toastElement.innerHTML = `
        <div class="toast-header">${toastTitle}
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    if (toastBody) {
        toastElement.innerHTML += `
        <div class="toast-body">
        ${toastBody}
        </div>`
    }

    toastContainer.appendChild(toastElement);

    document.body.appendChild(toastContainer);
    // const copyToClipBoardButton = document.getElementById(buttonId);
    // copyToClipBoardButton?.parentNode?.insertBefore(toastElement, copyToClipBoardButton.nextSibling);

    const myToast = bootstrap.Toast.getOrCreateInstance(toastElement);

    myToast.show();

    /**
     *  Note: If multiple clipboard items are clicked then all the toast notifications will remain in the DOM even after they're no longer displayed.
     * This fixes that by removing the element from DOM 1 second after it's no longer in view
     */
    if (toastElementAttributes["data-bs-autohide"]) {
        setTimeout(() => {
            if (toastElement) {
                toastElement.remove()
            }
        }, (toastDelay + 1000));
        }
    }

    static  setAttributes = (el: HTMLElement , attrs: any) => {
        for(var key in attrs) {
          el.setAttribute(key, attrs[key]);
        }
    }

    static formatCurrency = (input: string, convertToInteger=false) => {
        let parsedInput;
        if (convertToInteger) {
            parsedInput = Number.parseInt(input);
        } else {
            parsedInput = Number.parseFloat(input)
        }
        return Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 } ).format(parsedInput);
    }
}