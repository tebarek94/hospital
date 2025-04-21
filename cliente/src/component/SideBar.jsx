import React, { useState } from "react";
import {
  VStack,
  Text,
  Box,
  HStack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaUserCog,
  FaClipboardList,
  FaFileAlt,
  FaUserMd,
  FaProcedures,
  FaMoneyBillAlt,
  FaCalendarAlt,
  FaUserNurse,
  FaVials,
} from "react-icons/fa";

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [activeLink, setActiveLink] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const profession = userData?.Profession?.toLowerCase();

  const routes = {
    admin: [
      { label: "Dashboard", path: "/admin/dashboard", icon: FaHome },
      { label: "User Management", path: "/admin/users", icon: FaUserCog },
      { label: "Reports", path: "/admin/reports", icon: FaClipboardList },
      { label: "Settings", path: "/admin/settings", icon: FaFileAlt },
      { label: "Departments", path: "/admin/create-department", icon: FaUserCog },
      { label: "Payments", path: "/admin/checkout-payment", icon: FaMoneyBillAlt },
      { label: "Emergency Contacts", path: "/admin/emergencylist", icon: FaClipboardList },
      { label: "Patient History", path: "/admin/history", icon: FaFileAlt },
      { label: "Lab Results", path: "/admin/labr", icon: FaVials },
      { label: "Notifications", path: "/admin/notifiy", icon: FaClipboardList },
      { label: "Insurance", path: "/admin/insurance", icon: FaMoneyBillAlt },
      { label: "Appointments", path: "/admin/appointments", icon: FaCalendarAlt },
      { label: "Deparetement", path: "/admin/deparetement", icon: FaCalendarAlt },
      { label: "Add emp", path: "/admin/adduser", icon: FaCalendarAlt },
    ],
    doctor: [
      { label: "Dashboard", path: "/doctor/dashboard", icon: FaHome },
      { label: "Patients", path: "/doctor/patients", icon: FaProcedures },
      { label: "Prescriptions", path: "/doctor/prescriptions", icon: FaFileAlt },
    ],
    nurse: [
      { label: "Dashboard", path: "/nurse/dashboard", icon: FaHome },
      { label: "Patient Care", path: "/nurse/patient-care", icon: FaUserNurse },
      { label: "Vitals", path: "/nurse/vitals", icon: FaClipboardList },
    ],
    receptionist: [
      { label: "Dashboard", path: "/receptionist/dashboard", icon: FaHome },
      { label: "Billing", path: "/receptionist/billing", icon: FaMoneyBillAlt },
    ],
    patient: [
      { label: "Dashboard", path: "/patient/dashboard", icon: FaHome },
      { label: "Appointments", path: "/patient/appointments", icon: FaCalendarAlt },
      { label: "Pay out", path: "/patient/checkout", icon: FaCalendarAlt },
    ],
  };

  const roleRoutes = routes[profession] || [];

  const SidebarContent = () => (
    <VStack align="start" p={4} spacing={4}>
      <Text fontWeight="bold" mb={4} fontSize="lg">
        {profession?.toUpperCase() || "MENU"}
      </Text>
      {roleRoutes.map((link) => (
        <Box key={link.path} w="full">
          <NavLink to={link.path} onClick={() => setActiveLink(link.path)}>
            {({ isActive }) => (
              <HStack
                spacing={3}
                fontWeight={isActive || activeLink === link.path ? "bold" : "normal"}
                color={isActive || activeLink === link.path ? "teal.500" : "gray.700"}
              >
                <link.icon />
                <Text>{link.label}</Text>
              </HStack>
            )}
          </NavLink>
        </Box>
      ))}
    </VStack>
  );

  return (
    <Box>
      {isMobile ? (
        <>
          <IconButton
            icon={<FaBars />}
            aria-label="Open Sidebar"
            onClick={onOpen}
            position="fixed"
            top={4}
            left={4}
            zIndex={1000}
          />
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>
                <SidebarContent />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Box w="250px" h="100vh" p={4} boxShadow="lg">
          <SidebarContent />
        </Box>
      )}
    </Box>
  );
};

export default SideBar;
