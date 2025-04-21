import {
    IconButton,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react';
  import { HamburgerIcon } from '@chakra-ui/icons';
  
  export const MobileSidebar = ({ isOpen, onClose }) => {
    return (
      <>
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          onClick={onClose}
          position="fixed"
          top={4}
          left={4}
          zIndex={20}
        />
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <SideBar />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  };