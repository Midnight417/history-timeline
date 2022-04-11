import Box from "@mui/material/Box";
import { ColorPicker } from "material-ui-color";
import { Field, FieldProps } from "formik";
import React, { InputHTMLAttributes } from "react";

// Formik form controlled text input or textarea

interface InputColorProps extends React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

    // Label, helper text, and name of input
    label: string;
    helper?: string;
    name: string;

    // Validtion function for input value
    validate?: (value: any | any[]) => string | undefined;

    // Style of container
    containerStyle?: React.CSSProperties;

    // Input or textarea?
    multiline?: boolean;
};

export const InputColor: React.FC<InputColorProps> = ({
    name,
    label,
    helper,
    containerStyle,
    validate,
    value: _,
    multiline,
}) => {
    return (
        // Container and field wrapper for Input
        <Box sx={containerStyle}>
            <Field name={name} validate={validate}>
                {({ field, form }: FieldProps) => {
                    return (
                        <Box mt={3} mb={1}>
                            <ColorPicker
                                value={field.value}
                                onChange={(color) => { form.setFieldValue(name, `#${color.hex}`) }}
                            />
                        </Box>
                    )
                }}
            </Field>
        </Box>
    );
};