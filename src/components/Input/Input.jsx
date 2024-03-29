import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const Input = ({ name, required=true , id, label, control, errors, autoFocus=false, defaultValue="", ...props }) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => <TextField
        error= {errors[name] ?  true : false}
        name={name}
        required
        fullWidth
        color='primary'
        id={id}
        label={label}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        {...props}
        onChange={onChange}
        helperText={ errors[name] ? errors[name].message : ""}
      />}
      rules={required ? { required: `${name.toUpperCase()} required` } : null}
    />

  )
}

export default Input