
interface ToastProps {
    title?: string;
    toastBody?: JSX.Element;
}
export function Toast({title, toastBody} : ToastProps){


    return (
        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
        <div className="toast-header">
            <strong className="me-auto">{title}</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        {toastBody && 
            <div className="toast-body">
                {toastBody}
            </div>
        }
        </div>
    )
}