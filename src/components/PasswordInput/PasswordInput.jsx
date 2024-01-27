import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Input = ({ name, required = true, id, label, control, errors, autoFocus = false, defaultValue = "", ...props }) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange } }) => <TextField
                error={errors[name] ? true : false}
                name={name}
                required
                fullWidth
                color='primary'
                id={id}
                label={label}
                autoFocus={autoFocus}
                defaultValue={defaultValue}
                type={showPassword ? 'text' : 'password'}
                {...props}
                onChange={onChange}
                helperText={errors[name] ? errors[name].message : ""}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>setShowPassword((prevState)=>!prevState)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    
                }}
            />}
            rules={required ? { required: `${name.toUpperCase()} required` } : null}
        />

    )
}

export default Input