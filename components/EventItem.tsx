import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { toHumanDate } from "../util/const";
import { HistoricalEvent } from "../util/type";

interface EventItemProps {
    event: HistoricalEvent;
    handleOpen: () => void;
    scrollTo: () => void;
};

export const EventItem: React.FC<EventItemProps> = ({ event, scrollTo, handleOpen }) => {
    return (
        <Paper elevation={2} sx={{ marginBottom: 1, cursor: "pointer" }} onClick={scrollTo} onDoubleClick={handleOpen}>
            <Box display="flex" padding={1.5} fontSize="small">
                <Typography width={150}>
                    {
                        event.monthPresent && event.datePresent
                            ? toHumanDate(event.date, { month: true, date: true })
                            : event.monthPresent
                                ? toHumanDate(event.date, { month: true })
                                : toHumanDate(event.date)
                    }
                </Typography>
                <Typography width="50vw" textOverflow="ellipsis">{event.name}</Typography>
                <Typography>{event.leader?.name}</Typography>
            </Box>
        </Paper>
    );
};