import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
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

    // Change event
    onChange?: (value: number | string) => any;

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
    validate,
    onChange
}) => {
    return (
        // Container and field wrapper for Input
        <Box sx={containerStyle}>
            <Field name={name} validate={validate}>
                {({ field, form }: FieldProps) => {
                    return (
                        <FormControl variant={variant} sx={{ mt: 2, mb: 1, minWidth: 120, width: "100%" }}>
                            <InputLabel id={`label-${name}`}>{label}</InputLabel>
                            <Select
                                labelId={`label-${name}`}
                                {...field}
                                label={label}
                                fullWidth
                                value={field.value}
                                error={!!(form.errors[name] && form.touched[name])}
                                onChange={(event) => {
                                    if (onChange) onChange(event.target.value);
                                    form.setFieldValue(name, event.target.value)
                                }}
                            >
                                {
                                    options.map(item => (
                                        <MenuItem key={item.value} value={item.value} onClick={() => {
                                            
                                        }}>{item.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    )
                }}
            </Field>
        </Box >
    );
};