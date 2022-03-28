import React from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Form, Formik } from "formik";
import Box from "@mui/material/Box";
import { InputField } from "./form/InputField";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { HistoricalEvent } from "@prisma/client";

export const NewEvent: React.FC = ({ }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const queryClient = useQueryClient()

    const mutation = useMutation(
        (newEvent: any) => axios.post(`/api/event?name=${newEvent.name}&description=${newEvent.description}&date=${newEvent.date}&monthPresent=${newEvent.monthPresent}&datePresent=${newEvent.datePresent}`),
        {
            onSuccess: data => {
                queryClient.setQueryData("eventData", data.data);
                handleClose();
            }
        }
    )

    return (
        <>
            <Button onClick={handleOpen} sx={{margin: 5, marginBottom: 2}} variant="contained">+ Add Event</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >{/* Form with Formik */}
                <Formik

                    // Fields
                    initialValues={{
                        name: "",
                        description: "",
                        year: 1990,
                        month: undefined,
                        date: undefined
                    }}

                    // Submit function
                    onSubmit={async (values) => {
                        mutation.mutate({
                            name: values.name,
                            description: values.description,
                            date: `${values.year}-${values.month ?  values.month : 1}-${values.date ? values.date : 1}`,
                            monthPresent: !!values.month,
                            datePresent: !!values.date
                        })
                    }}
                >

                    {({ values }) => (<>
                        {/* Box for header and menu options */}
                        <Box justifyContent="space-between" alignItems="center" bgcolor="white" borderRadius={2} p={4} mt={8} mx={8}>
                            <h3>Add Event</h3>

                            {/* Form with Formik controls */}
                            <Form style={{
                                flexGrow: 1,
                                flexShrink: 1,
                                flexBasis: 300,
                                display: "flex",
                                flexDirection: "column"
                            }}>

                                <InputField
                                    label="Name"
                                    name="name"
                                    autoComplete="off"
                                    placeholder="Untitled"
                                    variant="filled"
                                    required
                                />

                                <InputField
                                    label="Description"
                                    name="description"
                                    autoComplete="off"
                                    variant="filled"
                                    style={{height: 128, fontSize: "small"}}
                                    multiline
                                />

                                <Box display="flex">
                                    <InputField
                                        label="Year"
                                        name="year"
                                        type="number"
                                        autoComplete="off"
                                        variant="filled"
                                        containerStyle={{ marginRight: 4 }}
                                        required
                                        min={0}
                                        max={2022}
                                    />

                                    <InputField
                                        label="Month"
                                        name="month"
                                        type="number"
                                        autoComplete="off"
                                        variant="filled"
                                        containerStyle={{ marginRight: 4 }}
                                        min={1}
                                        max={12}
                                    />

                                    <InputField
                                        label="Date"
                                        name="date"
                                        type="number"
                                        autoComplete="off"
                                        variant="filled"
                                        containerStyle={{ marginRight: 4 }}
                                    />
                                </Box>

                                {/* <InputSelect
                                    label="Color"
                                    name="color"
                                    variant="filled"
                                    options={[
                                        {
                                            name: "Green",
                                            value: "#5efc8d"
                                        },
                                    ]}
                                /> */}

                                {/* Submit Button */}
                                <Box marginTop={4}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                    >
                                        Save Event
                                    </Button>
                                </Box>
                            </Form>
                        </Box>
                    </>)}
                </Formik>
            </Modal>
        </>
    );
};