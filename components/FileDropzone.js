import {useDropzone} from "react-dropzone";
import {useCallback} from "react";

export function FileDropzone({handleDrop, disabled, filename}) {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: ".csv",
        disabled: disabled,
        multiple: false,
        onDrop: handleDrop
    })

    return (
        <>
            <div
                {...getRootProps()}
                className={[
                    "dropzone-box",
                    isDragActive ? "dragging" : "",
                    disabled ? 'disabled' : ''
                ].join(" ")}
            >
                <input {...getInputProps()} />
                <p>
                    {filename ? filename : (isDragActive ?
                        "Drop a file here..." :
                        "Drag 'n' drop a file here, or click to select files"
                    )}
                </p>
            </div>
            <style jsx>{`
                .dropzone-box {
                    background: var(--fcf-blue);
                    width: min(360px, 100vw);
                    height: 120px;
                    margin: 25px 0;
                    color: white;
                    cursor: pointer;
                    border: 3px solid var(--fcf-dark-blue);
                    transition: all 0.1s;
                }
                
                .dropzone-box.disabled {
                    cursor: not-allowed;
                    background: #5a6266;
                    color: #98a1a4;
                }
                
                .dropzone-box:hover:not(.disabled),
                .dropzone-box:focus:not(.disabled) {
                    background: var(--fcf-light-blue);
                }
                
                .dropzone-box:active:not(.disabled),
                .dropzone-box.dragging:not(.disabled) {
                    background: var(--fcf-bright-blue);
                    border-color: var(--fcf-pale-blue);
                }
                
                .dropzone-box p {
                    --dropzone-box-spacing: 8px;
                    margin: var(--dropzone-box-spacing);
                    width: calc(100% - 2*var(--dropzone-box-spacing));
                    height: calc(100% - 2*var(--dropzone-box-spacing));
                    display: flex;
                    text-align: center;
                    place-items: center;
                    place-content: center;
                    border: 5px dashed var(--fcf-very-dark-blue);
                    padding: 24px;
                }
                
                .dropzone-box:active:not(.disabled) p,
                .dropzone-box.dragging:not(.disabled) p {
                    border-color: var(--fcf-pale-blue);
                }
            `}</style>
        </>
    )
}
