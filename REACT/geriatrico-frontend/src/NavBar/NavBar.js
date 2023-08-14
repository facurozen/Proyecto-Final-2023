import React from "react";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, CalendarToday, EventNote, Person } from "@mui/icons-material";
import "./NavBar.css"

function NavBar() {
  return (
    <BottomNavigation className="navBar1" showLabels>
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Home"
        icon={<Home />}
      />
      <BottomNavigationAction
        component={Link}
        to="/calendario"
        label="Calendario"
        icon={<CalendarToday />}
      />
      <BottomNavigationAction
        component={Link}
        to="/agendaVisitas"
        label="Visitas"
        icon={<EventNote />}
      />
      <BottomNavigationAction
        component={Link}
        to="/perfil"
        label="Perfil"
        icon={<Person />}
      />
    </BottomNavigation>
  );
}

export default NavBar;
