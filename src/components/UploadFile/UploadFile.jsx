import React, { useState, useEffect } from 'react'
import { Controller } from 'react-hook-form';

export const UploadFile = ({ name, control, setFileDataURL }) => {

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
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange } }) => <input
                type="file"
                id="file"
                name="img"
                accept="image/*"
                style={{ display: 'none' }} onChange={(event) => {
                    handleChange(event);
                    onChange(event);
                }} />}
        />
    )
}
