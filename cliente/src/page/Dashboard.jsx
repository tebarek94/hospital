import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Text,
  Card,
  CardBody,
  Heading,
  useBreakpointValue
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSpring, animated } from 'react-spring'; // eslint-disable-line no-unused-vars
import { LayoutGroup } from 'framer-motion';

const Dashboard = () => {
  // Sample data for the chart
  const data = [
    { name: 'Jan', Patients: 40 },
    { name: 'Feb', Patients: 30 },
    { name: 'Mar', Patients: 50 },
    { name: 'Apr', Patients: 40 },
    { name: 'May', Patients: 60 },
    { name: 'Jun', Patients: 70 },
  ];

  // Card animation
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 300 });

  const hospitalInfo = {
    name: 'City Hospital',
    address: '123 Health St, Metropolis',
    contact: '+123 456 7890',
    totalPatients: 1200,
    totalDoctors: 150,
    totalAppointments: 2500
  };

  // Responsive grid settings
  const columnCount = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <Box p={6}>
      <Grid templateColumns={`repeat(${columnCount}, 1fr)`} gap={6}>
        {/* General Info Card */}
        <GridItem colSpan={columnCount}>
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Hospital Information</Heading>
              <Text><strong>Name:</strong> {hospitalInfo.name}</Text>
              <Text><strong>Address:</strong> {hospitalInfo.address}</Text>
              <Text><strong>Contact:</strong> {hospitalInfo.contact}</Text>
            </CardBody>
          </Card>
        </GridItem>

        {/* Animated Cards for Hospital Stats */}
        <LayoutGroup>
          <GridItem>
            <animated.div style={fadeIn}>
              <Card>
                <CardBody>
                  <Heading size="md" mb={4}>Total Patients</Heading>
                  <Text fontSize="xl">{hospitalInfo.totalPatients}</Text>
                </CardBody>
              </Card>
            </animated.div>
          </GridItem>
          <GridItem>
            <animated.div style={fadeIn}>
              <Card>
                <CardBody>
                  <Heading size="md" mb={4}>Total Doctors</Heading>
                  <Text fontSize="xl">{hospitalInfo.totalDoctors}</Text>
                </CardBody>
              </Card>
            </animated.div>
          </GridItem>
          <GridItem>
            <animated.div style={fadeIn}>
              <Card>
                <CardBody>
                  <Heading size="md" mb={4}>Total Appointments</Heading>
                  <Text fontSize="xl">{hospitalInfo.totalAppointments}</Text>
                </CardBody>
              </Card>
            </animated.div>
          </GridItem>
        </LayoutGroup>

        {/* Chart Section */}
        <GridItem colSpan={columnCount}>
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Patient Statistics (Line Chart)</Heading>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Patients" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;