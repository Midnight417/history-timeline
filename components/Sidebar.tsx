import React from 'react';
import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import TimelineIcon from '@mui/icons-material/Timeline';
import Typography from '@mui/material/Typography';

interface SidebarProps {
    open: boolean;
    toggleDrawer: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ open, toggleDrawer }) => {
    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer}
        >
            <Typography
                variant="h6"
                noWrap
                component="div"
                fontSize={18}
                m={2}
                mb={0.5}
            >
                IB History HL Timeline
            </Typography>
            <Link href="/">
                <a>
                    <ListItem button sx={{ width: 300 }}>
                        <ListItemIcon>
                            <EventNoteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Historical Events" />
                    </ListItem>
                </a>
            </Link>

            <Link href="/timeline">
                <a>
                    <ListItem button sx={{ width: 300 }}>
                        <ListItemIcon>
                            <TimelineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Historical Timeline" />
                    </ListItem>
                </a>
            </Link>

            <Typography
                variant="h6"
                noWrap
                component="div"
                fontSize={18}
                m={2}
                mb={0.5}
            >
                Database
            </Typography>

            <Link href="/leader">
                <a>
                    <ListItem button sx={{ width: 300 }}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dictators / Leaders" />
                    </ListItem>
                </a>
            </Link>

            <Link href="/country">
                <a>
                    <ListItem button sx={{ width: 300 }}>
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText primary="Countries" />
                    </ListItem>
                </a>
            </Link>
        </Drawer>
    );
}
