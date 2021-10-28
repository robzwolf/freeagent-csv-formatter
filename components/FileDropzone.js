import {useDropzone} from "react-dropzone";
import {useCallback} from "react";

export function FileDropzone({handleDrop}) {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: ".csv",
        multiple: false,
        onDrop: useCallback(handleDrop, [])
    })

    console.log(isDragActive)

    return (
        <>
            <div {...getRootProps()} className={["dropzone-box", isDragActive ? "dragging" : ""].join(" ")}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop a file here...</p> :
                        <p>Drag 'n' drop a file here, or click to select files</p>
                }
            </div>
            <style jsx>{`
                .dropzone-box {
                    background: var(--fcf-blue);
                    width: 360px;
                    height: 120px;
                    margin: 25px 0;
                    color: white;
                    cursor: pointer;
                    border: 3px solid var(--fcf-dark-blue);
                    transition: all 0.1s;
                }
                
                .dropzone-box:hover {
                    background: var(--fcf-light-blue);
                }
                
                .dropzone-box:active,
                .dropzone-box.dragging {
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
                
                .dropzone-box:active p,
                .dropzone-box.dragging p {
                    border-color: var(--fcf-pale-blue);
                }
            `}</style>
        </>
    )
}
