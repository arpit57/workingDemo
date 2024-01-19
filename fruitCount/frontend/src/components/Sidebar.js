import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.scss";
import { sidebarData } from "../assets/data/SidebarData";
import { IconButton, List, ListItem, ListItemButton } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { stampReportsList } from "../assets/data/Stamp/stampReportsList";
import { UserContext } from "../contexts/UserContext";

function Sidebar() {
  const { setUser } = useContext(UserContext);
  return (
    <div className="sidebar">
      <List>
        <div className="avatar">
          <img
            src={require("../assets/images/logo.png")}
            alt="logo"
            width={150}
          />
        </div>

        {sidebarData.map((val) => {
          const { id, icon, name, url } = val;

          return (
            <div key={id}>
              <ListItem disableGutters={true} className="sidebar-listItem">
                {name === "Reports" ? (
                  <ListItemButton
                    sx={{ textAlign: "left" }}
                    className="appbar-links"
                    style={{ padding: "5px 0" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 10px",
                      }}
                    >
                      <IconButton sx={{ color: "#ffffff9f" }}>
                        {icon}
                      </IconButton>
                      <p className="sidebar-list-text">{name}</p>
                    </div>
                  </ListItemButton>
                ) : (
                  <NavLink to={`/${url}`} key={id} className="sidebar-link">
                    <ListItemButton
                      sx={{ textAlign: "left" }}
                      className="appbar-links"
                      style={{ padding: "5px 0" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton sx={{ color: "#ffffff9f" }}>
                          {icon}
                        </IconButton>
                        <p className="sidebar-list-text">{name}</p>
                      </div>
                    </ListItemButton>
                  </NavLink>
                )}
              </ListItem>

              {name === "Reports" &&
                stampReportsList.map((list) => {
                  return (
                    <ListItem
                      disableGutters={true}
                      key={list.id}
                      className="sidebar-listItem"
                    >
                      <NavLink
                        to={`/${list.url}`}
                        key={id}
                        className="sidebar-link"
                      >
                        <ListItemButton
                          sx={{ textAlign: "left" }}
                          className="appbar-links"
                          style={{ padding: "5px 0" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "0 15px",
                            }}
                          >
                            <IconButton sx={{ color: "#ffffff9f" }}>
                              {icon}
                            </IconButton>
                            <p className="sidebar-list-text">{list.name}</p>
                          </div>
                        </ListItemButton>
                      </NavLink>
                    </ListItem>
                  );
                })}
            </div>
          );
        })}

        <ListItem
          sx={{ textAlign: "left" }}
          className="sidebar-listItem"
          style={{
            padding: "5px 0",
          }}
        >
          <div className="sidebar-link">
            <ListItemButton
              sx={{ textAlign: "left" }}
              className="appbar-links"
              onClick={() => {
                setUser(null);
                localStorage.removeItem("stampToken");
              }}
              style={{
                padding: "5px 0",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => {
                  setUser(null);
                  localStorage.removeItem("texUser");
                }}
              >
                <IconButton sx={{ color: "#ffffff9f" }}>
                  <LogoutRoundedIcon />
                </IconButton>
                <p className="sidebar-list-text">Logout</p>
              </div>
            </ListItemButton>
          </div>
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
