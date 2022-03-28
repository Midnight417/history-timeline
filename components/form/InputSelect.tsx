import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Field, FieldProps } from "formik";
import React from "react";

// Formik form controlled checkbox

interface InputSelectProps {
    // Label, helper text, and name of the input
    label: string;
    helper?: string;
    name: string;

    // Validtion function for input value
    validate?: (value: any | any[]) => string | undefined;

    // Style of container
    containerStyle?: React.CSSProperties;

    // Style of the MUI input
    variant?: "filled" | "outlined" | "standard";

    // Options for select input
    options: {
        value: string | number;
        name: React.ReactNode;
    }[];
};

export const InputSelect: React.FC<InputSelectProps> = ({
    name,
    label,
    containerStyle,
    variant,
    options,
    validate
}) => {

    return (
        // Container and field wrapper for Input
        <Box sx={containerStyle}>
            <Field name={name} validate={validate}>
                {({ field, form }: FieldProps) => {
                    return (

                        <TextField
                            {...field}
                            label={label}
                            fullWidth
                            margin="normal"
                            select
                            variant={variant}
                            error={!!(form.errors[name] && form.touched[name])}
                        >
                            {
                                options.map(item => (
                                    <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                                ))
                            }
                        </TextField>
                    )
                }}
            </Field>
        </Box >
    );
};