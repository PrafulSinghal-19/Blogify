import { Controller } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

export default function RadioBtn({name, control, ...props}) {

    const[value,setValue]=useState(true)

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange } }) => <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                <RadioGroup
                    value={value}
                    onChange={(e) => {
                        onChange(e);
                        setValue(e.target.value);
                    }}
                >
                    <FormControlLabel value={true} control={<Radio />} label="Active" />
                    <FormControlLabel value={false} control={<Radio />} label="Inactive" />
                </RadioGroup>
            </FormControl>
            }
        />
    );
}