import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Grid,
  Image,
  Link as ChakraLink,
  Button,
  IconButton,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import { FaFacebook, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const hospitalImages = [
  "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t15.5256-10/330221429_1049246593133481_4135995952896380630_n.jpg?stp=dst-jpg_p206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=c3bc4c&_nc_eui2=AeHBxcEkkkT-RDip6xC4OdjumSBLTKhYUDmZIEtMqFhQOcIube2dhWu-MT6iq-zlPj-R_8wqUiCq5xM24PyK7U7k&_nc_ohc=ttwtcDsnH20Q7kNvwEThode&_nc_oc=AdlKc6d9ImuUnxFZdFvjSWF5MuOWbjJfxJmSXNY3T9F51gAx49mbJbLyNdZUyLIk-qw&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=OTi3K9_se7GM-IY5A4wjxw&oh=00_AfExyxxUUbKZG2CDUr_pfrR6uVCIH8Bv156Szg83ytE_DA&oe=6803D3A6", // Replace with actual URLs
  "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t15.5256-10/330221429_1049246593133481_4135995952896380630_n.jpg?stp=dst-jpg_p206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=c3bc4c&_nc_eui2=AeHBxcEkkkT-RDip6xC4OdjumSBLTKhYUDmZIEtMqFhQOcIube2dhWu-MT6iq-zlPj-R_8wqUiCq5xM24PyK7U7k&_nc_ohc=ttwtcDsnH20Q7kNvwEThode&_nc_oc=AdlKc6d9ImuUnxFZdFvjSWF5MuOWbjJfxJmSXNY3T9F51gAx49mbJbLyNdZUyLIk-qw&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=OTi3K9_se7GM-IY5A4wjxw&oh=00_AfExyxxUUbKZG2CDUr_pfrR6uVCIH8Bv156Szg83ytE_DA&oe=6803D3A6",
  "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t15.5256-10/330221429_1049246593133481_4135995952896380630_n.jpg?stp=dst-jpg_p206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=c3bc4c&_nc_eui2=AeHBxcEkkkT-RDip6xC4OdjumSBLTKhYUDmZIEtMqFhQOcIube2dhWu-MT6iq-zlPj-R_8wqUiCq5xM24PyK7U7k&_nc_ohc=ttwtcDsnH20Q7kNvwEThode&_nc_oc=AdlKc6d9ImuUnxFZdFvjSWF5MuOWbjJfxJmSXNY3T9F51gAx49mbJbLyNdZUyLIk-qw&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=OTi3K9_se7GM-IY5A4wjxw&oh=00_AfExyxxUUbKZG2CDUr_pfrR6uVCIH8Bv156Szg83ytE_DA&oe=6803D3A6",
  "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t15.5256-10/330221429_1049246593133481_4135995952896380630_n.jpg?stp=dst-jpg_p206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=c3bc4c&_nc_eui2=AeHBxcEkkkT-RDip6xC4OdjumSBLTKhYUDmZIEtMqFhQOcIube2dhWu-MT6iq-zlPj-R_8wqUiCq5xM24PyK7U7k&_nc_ohc=ttwtcDsnH20Q7kNvwEThode&_nc_oc=AdlKc6d9ImuUnxFZdFvjSWF5MuOWbjJfxJmSXNY3T9F51gAx49mbJbLyNdZUyLIk-qw&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=OTi3K9_se7GM-IY5A4wjxw&oh=00_AfExyxxUUbKZG2CDUr_pfrR6uVCIH8Bv156Szg83ytE_DA&oe=6803D3A6",
  "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t15.5256-10/330221429_1049246593133481_4135995952896380630_n.jpg?stp=dst-jpg_p206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=c3bc4c&_nc_eui2=AeHBxcEkkkT-RDip6xC4OdjumSBLTKhYUDmZIEtMqFhQOcIube2dhWu-MT6iq-zlPj-R_8wqUiCq5xM24PyK7U7k&_nc_ohc=ttwtcDsnH20Q7kNvwEThode&_nc_oc=AdlKc6d9ImuUnxFZdFvjSWF5MuOWbjJfxJmSXNY3T9F51gAx49mbJbLyNdZUyLIk-qw&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=OTi3K9_se7GM-IY5A4wjxw&oh=00_AfExyxxUUbKZG2CDUr_pfrR6uVCIH8Bv156Szg83ytE_DA&oe=6803D3A6",
];

const hospitalCards = [
  {
    title: "Emergency Services",
    description: "Our emergency department operates 24/7, providing quick and effective care for urgent medical needs.",
    image: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/485898096_1088326886642941_4033121006256375938_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGyULsNf8mpdjrndeckUbswY_06irax7ytj_TqKtrHvK3G0d2o6oytKIknVtFXqa16hjrokvuBmY_YA7Crdu4DT&_nc_ohc=qUoFTUV4SucQ7kNvwFMjNuN&_nc_oc=Adn0EB1phII0bVLoWQb_PKwy7cIGlqFEhERu3rL4nXIEmUITSqd3rhNLVOTQd5QQWxQ&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=gG_PJ6-Tdgere_CESAGNPA&oh=00_AfEV9dcO1smtZVlM67nmKYMIW0NnKYzQyQEMW5K4RfrV7w&oe=680401CC",
  },
  {
    title: "Surgical Excellence",
    description: "We offer state-of-the-art surgical procedures led by our team of experienced surgeons.",
    image: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t15.5256-10/330221429_1049246593133481_4135995952896380630_n.jpg?stp=dst-jpg_p206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=c3bc4c&_nc_eui2=AeHBxcEkkkT-RDip6xC4OdjumSBLTKhYUDmZIEtMqFhQOcIube2dhWu-MT6iq-zlPj-R_8wqUiCq5xM24PyK7U7k&_nc_ohc=ttwtcDsnH20Q7kNvwEThode&_nc_oc=AdlKc6d9ImuUnxFZdFvjSWF5MuOWbjJfxJmSXNY3T9F51gAx49mbJbLyNdZUyLIk-qw&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=OTi3K9_se7GM-IY5A4wjxw&oh=00_AfExyxxUUbKZG2CDUr_pfrR6uVCIH8Bv156Szg83ytE_DA&oe=6803D3A6",
  },
  {
    title: "Maternity Care",
    description: "Our maternity ward provides exceptional care for mothers and newborns with skilled staff and modern facilities.",
    image: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/485898096_1088326886642941_4033121006256375938_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGyULsNf8mpdjrndeckUbswY_06irax7ytj_TqKtrHvK3G0d2o6oytKIknVtFXqa16hjrokvuBmY_YA7Crdu4DT&_nc_ohc=qUoFTUV4SucQ7kNvwFMjNuN&_nc_oc=Adn0EB1phII0bVLoWQb_PKwy7cIGlqFEhERu3rL4nXIEmUITSqd3rhNLVOTQd5QQWxQ&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=gG_PJ6-Tdgere_CESAGNPA&oh=00_AfEV9dcO1smtZVlM67nmKYMIW0NnKYzQyQEMW5K4RfrV7w&oe=680401CC",
  },
  {
    title: "Pediatrics Department",
    description: "Comprehensive medical care for children, ensuring their healthy growth and development.",
    image: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t15.5256-10/466945034_1492713288081051_7621257354639383014_n.jpg?stp=dst-jpg_p370x247_tt6&_nc_cat=107&ccb=1-7&_nc_sid=282d23&_nc_eui2=AeEekJ-fmC2tlsHxXmzcf_qorg9j4fMeO9CuD2Ph8x470JzOM6Etskm9bTaFwG71LjoTJVpLBJII8gsSuqZqvttB&_nc_ohc=H4SWRg_A-JUQ7kNvwFdUI23&_nc_oc=AdnCdkvgGaq_FvCmh1GmHkxPsmN52KyJ1WfU4Ja6s0je03DCeHciFtmaj83t1ZkXc9E&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=OTi3K9_se7GM-IY5A4wjxw&oh=00_AfGSocvRLWx2em0CnxDcDJbRLF3oGjOxcdXaSWiD2V3PNg&oe=6803EC12",
  },
  {
    title: "Outpatient Services",
    description: "We offer a wide range of outpatient services for diagnostics, consultations, and treatments.",
    image: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t15.5256-10/330221429_1049246593133481_4135995952896380630_n.jpg?stp=dst-jpg_p206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=c3bc4c&_nc_eui2=AeHBxcEkkkT-RDip6xC4OdjumSBLTKhYUDmZIEtMqFhQOcIube2dhWu-MT6iq-zlPj-R_8wqUiCq5xM24PyK7U7k&_nc_ohc=ttwtcDsnH20Q7kNvwEThode&_nc_oc=AdlKc6d9ImuUnxFZdFvjSWF5MuOWbjJfxJmSXNY3T9F51gAx49mbJbLyNdZUyLIk-qw&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=OTi3K9_se7GM-IY5A4wjxw&oh=00_AfExyxxUUbKZG2CDUr_pfrR6uVCIH8Bv156Szg83ytE_DA&oe=6803D3A6",
  },
];

const HospitalOverview = () => {
  return (
    <Box>
      {/* Header */}
      <Flex
        as="header"
        bg="teal.600"
        color="white"
        p={4}
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="lg">Wolkite University Comprehensive Specialized Hospital</Heading>
      </Flex>

      {/* Overview Section */}
      <Box p={6}>
        <VStack align="start" spacing={4}>
          <Heading size="md">Overview</Heading>
          <Text>
            Wolkite University Comprehensive Specialized Hospital is located in Gurage, Ethiopia.
            We are dedicated to providing exceptional healthcare services and wellness programs
            to our community. Contact us for any inquiries or appointments.
          </Text>
          <Flex align="center" gap={4}>
            <FaMapMarkerAlt />
            <Text>Gurage, Ethiopia</Text>
          </Flex>
          <Flex align="center" gap={4}>
            <FaPhoneAlt />
            <Text>092 007 4679</Text>
          </Flex>
          <Flex align="center" gap={4}>
            <FaEnvelope />
            <Text>hospital@wku.edu.et</Text>
          </Flex>
          <ChakraLink href="https://hospital.wku.edu.et" color="teal.500" isExternal>
            Visit our website
          </ChakraLink>
        </VStack>
      </Box>

      {/* Card List Section */}
      <Box p={6} bg="gray.100">
        <Heading size="md" mb={4}>Our Services</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {hospitalCards.map((card, index) => (
            <Card key={index} boxShadow="md" borderRadius="lg" overflow="hidden">
              <Image src={card.image} alt={card.title} />
              <CardBody>
                <Heading size="sm">{card.title}</Heading>
                <Text mt={2}>{card.description}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>

      {/* Image Gallery */}
      <Box p={6}>
        <Heading size="md" mb={4}>Image Gallery</Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4}>
          {hospitalImages.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Gallery Image ${index + 1}`}
              borderRadius="md"
              boxShadow="md"
              _hover={{ transform: 'scale(1.05)', transition: 'transform 0.3s' }}
            />
          ))}
        </Grid>
      </Box>

      {/* Footer with Google Map */}
      <Box as="footer" p={6} bg="teal.600" color="white">
        <VStack spacing={4}>
          <Heading size="md">Find Us</Heading>
          <Box w="100%" h="300px" bg="gray.300" borderRadius="md" overflow="hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.0000000000005!2d37.764000000000006!3d7.001000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNsKwMDAnMDIuNiJOIDM3wrA0Nyc4Mi4xIkU!5e0!3m2!1sen!2set!4v1680711253456!5m2!1sen!2set"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Wolkite University Hospital Location"
            ></iframe>
          </Box>
          <Flex gap={4}>
            <IconButton
              as="a"
              href="https://www.facebook.com"
              target="_blank"
              icon={<FaFacebook />}
              aria-label="Facebook"
              colorScheme="facebook"
            />
          </Flex>
          <Text>&copy; 2025 Wolkite University Hospital</Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default HospitalOverview;
