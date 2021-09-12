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
    static  copyToClipboard = (contentToCopy: string, buttonId: string, toastBody: string) => {
        const listener = (e: ClipboardEvent) =>  {
            let cleanedContent = Utils.cleanCopiedContent(contentToCopy);

            e?.clipboardData?.setData("text/html", cleanedContent);
            e?.clipboardData?.setData("text/plain", cleanedContent);
            console.log({contentToCopy, cleanedContent});
            
            e.preventDefault();
            Utils.createCopyToastNotification(buttonId, toastBody);

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
        console.log({contentToCopy});
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

    /**
     * Display a toast notification with information about the content that was copied to the clipboard.
     * If multiple toast notifications exist, stack them in the container.
     * Note: If multiple clipboard items are clicked then all the toast notifications will remain in the DOM even after they're no longer displayed.
     * @see https://getbootstrap.com/docs/5.0/components/toasts/
     * @param buttonId 
     * @param toastBody 
     */
    static createCopyToastNotification = (buttonId: string, toastBody: string) => {
    
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

    const toastElementAttributes = { 
        "class": "toast mt-3 remove-in-clipboard",
        "role": "alert",
        "aria-live": "polite",
        "aria-atomic": "true",
        "id": toastElementId,
        "data-bs-delay": "3000",
    };

    Utils.setAttributes(toastElement, toastElementAttributes);
    toastElement.innerHTML = `
        <div class="toast-header">
                <strong class="me-auto">Copied Table to Clipboard!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
        ${toastBody}
        </div>
    `;

    toastContainer.appendChild(toastElement);

    document.body.appendChild(toastContainer);
    // const copyToClipBoardButton = document.getElementById(buttonId);
    // copyToClipBoardButton?.parentNode?.insertBefore(toastElement, copyToClipBoardButton.nextSibling);

    const myToast = bootstrap.Toast.getOrCreateInstance(toastElement);

    myToast.show();
    }

    static  setAttributes = (el: HTMLElement , attrs: any) => {
        for(var key in attrs) {
          el.setAttribute(key, attrs[key]);
        }
    }
}