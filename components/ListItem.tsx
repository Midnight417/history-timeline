import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import IconButton from '@mui/material/IconButton';
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from '@mui/material/Typography';

interface ListItemProps {
    handleOpen: () => void;
    title: string;
    text?: string[];
    color?: string;
};

export const ListItem: React.FC<ListItemProps> = ({ title, text, color, handleOpen }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper elevation={2} sx={{ position: "relative", mb: 2, mr: 2, cursor: "pointer" }}>
            <Box
                display="flex"
                flexDirection="column"
                p={2}
                fontSize="small"
                onDoubleClick={handleOpen}
                width={200}
                height={175}
            >

                <IconButton onClick={handleClick} sx={{ width: 48, height: 48, alignSelf: "flex-end" }}>
                    <EditIcon />
                </IconButton>

                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={() => {
                        handleOpen();
                        handleClose();
                    }}>Edit</MenuItem>
                </Menu>

                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    fontWeight={700}
                    fontSize="normal"
                    display="flex"
                    alignItems="center"
                    mt={2}
                >
                    <CircleIcon sx={{ width: 16, height: 16, mr: 1, color: color }} /> {title}
                </Typography>

                {text?.map((item, i) => (
                    <Typography key={i}
                        component="div"
                    >
                        {item}
                    </Typography>
                ))}
            </Box>
        </Paper>
    );
};