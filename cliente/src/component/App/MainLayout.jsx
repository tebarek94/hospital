import { Grid, GridItem, Box } from '@chakra-ui/react';
import  NavBar  from '../NavBar';
import  SideBar  from "../SideBar";
import { MobileSidebar } from './MobileSidebar';
import { useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';

export const MainLayout = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, md: `"nav nav" "aside main"` }}
      templateColumns={{ base: '1fr', md: '250px 1fr' }}
      templateRows={{ base: 'auto 1fr', md: 'auto 1fr' }}
      h="100vh"
      gap={4}
    >
      <GridItem as="nav" area="nav">
        <NavBar />
      </GridItem>

      {isMobile ? (
        <MobileSidebar isOpen={isDrawerOpen} onClose={toggleDrawer} />
      ) : (
        <GridItem as="aside" area="aside" p={4}>
          <SideBar />
        </GridItem>
      )}

      <GridItem as="main" area="main" p={4}>
        {children}
      </GridItem>
    </Grid>
  );
};