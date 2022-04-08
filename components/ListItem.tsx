import Box from "@mui/material/Box";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import IconButton from '@mui/material/IconButton';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { toHumanDate } from "../util/const";
import { HistoricalEvent } from "../util/type";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface ListItemProps {
    handleOpen: () => void;
};

export const ListItem: React.FC<ListItemProps> = ({ children, handleOpen }) => {

    const [hover, setHover] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper elevation={2} sx={{ position: "relative", marginBottom: 1, cursor: "pointer" }}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            <Box sx={{ position: "absolute", marginLeft: -5, opacity: hover ? 1 : 0 }}>
                <IconButton>
                    <DragIndicatorIcon onClick={handleClick} />
                </IconButton>

                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={() => {
                        handleOpen();
                        handleClose();
                    }}>Edit</MenuItem>
                </Menu>
            </Box>
            <Box display="flex" padding={1} fontSize="small" onDoubleClick={handleOpen}>
                {children}
            </Box>
        </Paper>
    );
};