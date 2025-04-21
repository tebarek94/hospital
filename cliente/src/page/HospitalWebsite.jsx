import React from 'react';
import { ChakraProvider, Box, Container, VStack, useColorModeValue } from '@chakra-ui/react';
import { AboutSection } from '../component/hospital/AboutSection';
import { Header } from '../component/hospital/Header';
import { ServicesSection } from '../component/hospital/ServicesSection';
import { FeaturesSection } from '../component/hospital/FeaturesSection';
import { ContactSection } from '../component/hospital/ContactSection';
import { HeroSection } from '../component/hospital/HeroSection';
import { Footer } from '../component/hospital/Footer';
import NavBar from '../component/NavBar';
import HospitalOverview from '../component/hospital/hospitalImages';

const HospitalWebsite = () => {
  const bgColor = useColorModeValue('blue.50', 'blue.900');
  
  return (
    <ChakraProvider>
      <Box minH="100vh" bg={bgColor} pt={4} mt={20}> {/* Added padding-top */}
        <NavBar />
        <Header />
        <HeroSection />
        <HospitalOverview />
        <Container maxW="container.lg" py={8}>
          <VStack spacing={8} align="stretch">
            <AboutSection />
            <ServicesSection />
            <FeaturesSection />
            <ContactSection />
          </VStack>
        </Container>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};

export default HospitalWebsite;
