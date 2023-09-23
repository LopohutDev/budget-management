import { Box, AppBar, Toolbar, Typography, Drawer } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import LogoutButton from "../../LogoutButton";
// import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  //   const list = (anchor: Anchor) => (
  //     <Box
  //       sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
  //       role="presentation"
  //       onClick={toggleDrawer(anchor, false)}
  //       onKeyDown={toggleDrawer(anchor, false)}
  //     >
  //       <List>
  //         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
  //           <ListItem key={text} disablePadding>
  //             <ListItemButton>
  //               {/* <ListItemIcon>
  //                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //                   </ListItemIcon> */}
  //               <ListItemText primary={text} />
  //             </ListItemButton>
  //           </ListItem>
  //         ))}
  //       </List>
  //     </Box>
  //   );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#000000d3",
          padding: "0.8rem",
        }}
      >
        <Toolbar variant="dense" className="flex justify-between items-center">
          {/* <IconButton
            // onClick={() => {}}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <h1 className="font-pacifico text-4xl text-lime-500 font-outline">
            Budget Manager
          </h1>
          <LogoutButton />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left">AAA</Drawer>
    </Box>
  );
};

export default Header;
