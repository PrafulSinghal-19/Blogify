import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const Input = ({ name, required=true , id, label, control, errors, ...props }) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => <TextField
        error= {errors[name] ?  true : false}
        autoComplete='false'
        name={name}
        required
        fullWidth
        id={id}
        label={label}
        autoFocus
        {...props}
        onChange={onChange}
        helperText={ errors[name] ? errors[name].message : ""}
      />}
      rules={{ required: `${name.toUpperCase()} required` }}
    />

  )
}

export default Input