import React from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Form, Formik } from "formik";
import Box from "@mui/material/Box";
import { InputField } from "./form/InputField";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { HistoricalEvent } from "../util/type";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

interface EditEventProps {
    event?: HistoricalEvent;
    handleClose: () => void;
};

export const EditEvent: React.FC<EditEventProps> = ({ event, handleClose }) => {
    const queryClient = useQueryClient()

    const mutation = useMutation(
        (newEvent: any) => axios.put(`/api/event?id=${newEvent.id}&name=${newEvent.name}&description=${newEvent.description}&date=${newEvent.date}&monthPresent=${newEvent.monthPresent}&datePresent=${newEvent.datePresent}`),
        {
            onSuccess: data => {
                queryClient.setQueryData("eventData", data.data)
                handleClose();
            }
        }
    )

    const deletion = useMutation(
        (id: string) => axios.delete(`/api/event?id=${id}`),
        {
            onSuccess: data => {
                queryClient.setQueryData("eventData", data.data)
                handleClose();
            }
        }
    )

    return (
        <Modal
            open={!!event}
            onClose={handleClose}
        >{/* Form with Formik */}
            <Formik

                // Fields
                initialValues={{
                    name: event?.name,
                    description: event?.description,
                    year: event?.date[0],
                    month: event?.monthPresent ? event.date[1] : undefined,
                    date: event?.datePresent ? event.date[2] : undefined
                }}

                // Submit function
                onSubmit={async (values) => {
                    mutation.mutate({
                        id: event?.id,
                        name: values.name,
                        description: values.description,
                        date: `${values.year}-${values.month ? values.month : 1}-${values.date ? values.date : 1}`,
                        monthPresent: !!values.month,
                        datePresent: !!values.date
                    })
                }}
            >

                {({ values }) => (<>
                    {/* Box for header and menu options */}
                    <Box justifyContent="space-between" alignItems="center" bgcolor="white" borderRadius={2} p={4} mt={8} mx={8}>
                        <h3>Edit Event</h3>

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
                                style={{ height: 128, fontSize: "small" }}
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
                                />

                                <InputField
                                    label="Month"
                                    name="month"
                                    type="number"
                                    autoComplete="off"
                                    variant="filled"
                                    containerStyle={{ marginRight: 4 }}
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
                            <Box marginTop={4} display="flex">
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Save Event
                                </Button>

                                <IconButton sx={{ marginLeft: "auto" }} onClick={() => { deletion.mutate(event!.id) }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Form>
                    </Box>
                </>)}
            </Formik>
        </Modal>
    );
};