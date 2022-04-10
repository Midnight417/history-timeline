import React from 'react';
import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';

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
            <Link href="/">
                <a>
                    <ListItem button sx={{ width: 250 }}>
                        <ListItemIcon>
                            <EventNoteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Event" />
                    </ListItem>
                </a>
            </Link>

            <Link href="/leader">
                <a>
                    <ListItem button sx={{ width: 250 }}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Leader" />
                    </ListItem>
                </a>
            </Link>

            <Link href="/country">
                <a>
                    <ListItem button sx={{ width: 250 }}>
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText primary="Country" />
                    </ListItem>
                </a>
            </Link>
        </Drawer>
    );
}
