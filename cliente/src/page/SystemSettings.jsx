import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Switch,
  useColorMode,
  VStack,
  Text,
  Select,
  useToast,
} from '@chakra-ui/react';

const SystemSettings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    hospitalName: '',
    address: '',
    email: '',
    phone: '',
  });

  // Appearance Settings State
  const [appearanceSettings, setAppearanceSettings] = useState({
    themeColor: '',
    fontSize: '',
    darkMode: colorMode === 'dark',
  });

  // Notifications Settings State
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Load settings from local storage on mount
  useEffect(() => {
    const savedGeneralSettings = JSON.parse(
      localStorage.getItem('generalSettings')
    );
    const savedAppearanceSettings = JSON.parse(
      localStorage.getItem('appearanceSettings')
    );
    const savedNotificationsEnabled =
      localStorage.getItem('notificationsEnabled') === 'true';

    if (savedGeneralSettings) setGeneralSettings(savedGeneralSettings);
    if (savedAppearanceSettings) setAppearanceSettings(savedAppearanceSettings);
    setNotificationsEnabled(savedNotificationsEnabled);
  }, []);

  // Save General Settings
  const saveGeneralSettings = () => {
    localStorage.setItem('generalSettings', JSON.stringify(generalSettings));
    toast({
      title: 'General Settings Saved',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Save Appearance Settings
  const saveAppearanceSettings = () => {
    localStorage.setItem('appearanceSettings', JSON.stringify(appearanceSettings));
    toast({
      title: 'Appearance Settings Saved',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Save Notification Settings
  const saveNotificationSettings = () => {
    localStorage.setItem('notificationsEnabled', notificationsEnabled);
    toast({
      title: 'Notification Settings Saved',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Heading mb={6}>System Settings</Heading>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>General</Tab>
          <Tab>Appearance</Tab>
          <Tab>Notifications</Tab>
          <Tab>Backup</Tab>
        </TabList>

        <TabPanels>
          {/* General Tab */}
          <TabPanel>
            <VStack spacing={6} align="stretch" maxW="600px">
              <FormControl>
                <FormLabel>Hospital Name</FormLabel>
                <Input
                  name="hospitalName"
                  value={generalSettings.hospitalName}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      hospitalName: e.target.value,
                    })
                  }
                  placeholder="Enter hospital name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Textarea
                  name="address"
                  value={generalSettings.address}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      address: e.target.value,
                    })
                  }
                  placeholder="Enter hospital address"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Contact Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={generalSettings.email}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter contact email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="phone"
                  type="tel"
                  value={generalSettings.phone}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Enter phone number"
                />
              </FormControl>
              <Button colorScheme="blue" onClick={saveGeneralSettings}>
                Save General Settings
              </Button>
            </VStack>
          </TabPanel>

          {/* Appearance Tab */}
          <TabPanel>
            <VStack spacing={6} align="stretch" maxW="600px">
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Dark Mode</FormLabel>
                <Switch
                  isChecked={appearanceSettings.darkMode}
                  onChange={() => {
                    toggleColorMode();
                    setAppearanceSettings({
                      ...appearanceSettings,
                      darkMode: !appearanceSettings.darkMode,
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Theme Color</FormLabel>
                <Select
                  name="themeColor"
                  value={appearanceSettings.themeColor}
                  onChange={(e) =>
                    setAppearanceSettings({
                      ...appearanceSettings,
                      themeColor: e.target.value,
                    })
                  }
                  placeholder="Select theme color"
                >
                  <option value="blue">Blue</option>
                  <option value="teal">Teal</option>
                  <option value="purple">Purple</option>
                  <option value="orange">Orange</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Font Size</FormLabel>
                <Select
                  name="fontSize"
                  value={appearanceSettings.fontSize}
                  onChange={(e) =>
                    setAppearanceSettings({
                      ...appearanceSettings,
                      fontSize: e.target.value,
                    })
                  }
                  placeholder="Select font size"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </Select>
              </FormControl>
              <Button colorScheme="blue" onClick={saveAppearanceSettings}>
                Save Appearance Settings
              </Button>
            </VStack>
          </TabPanel>

          {/* Notifications Tab */}
          <TabPanel>
            <VStack spacing={6} align="stretch" maxW="600px">
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Enable Notifications</FormLabel>
                <Switch
                  isChecked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
              </FormControl>
              <Button colorScheme="blue" onClick={saveNotificationSettings}>
                Save Notification Settings
              </Button>
            </VStack>
          </TabPanel>

          {/* Backup Tab */}
          <TabPanel>
            <VStack spacing={6} align="stretch" maxW="600px">
              <Text>System backup and restore options</Text>
              {/* Add backup settings here */}
              <Button colorScheme="blue">Save Backup Settings</Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SystemSettings;
