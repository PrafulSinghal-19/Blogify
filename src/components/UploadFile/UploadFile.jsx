import React, { useState, useEffect, forwardRef } from 'react'

export const UploadFile = forwardRef(function UploadFile({ setFileDataURL, onChange, onBlur, name }, ref) {

    const [file, setFile] = useState(null);

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);

    const handleChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    }

    return (
        <input
            type="file"
            id="file"
            name={name}
            accept="image/*"
            ref={ref}
            style={{ display: 'none' }}
            onBlur={onBlur}
            onChange={(event) => {
                handleChange(event);
                onChange(event);
            }
            }
        />
    )
}
) 
