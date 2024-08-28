import { useEffect, useState } from 'react';
import { Button, MenuItem, Select, InputLabel, FormControl, Drawer, Box, TextField } from '@mui/material';
import { fetchOrders, fetchDropdownData } from '../utils/axios'; // Updated import
import { Order } from '../types/api';
import { SelectChangeEvent } from '@mui/material/Select';

// Define types for dropdown data
type DropdownData = {
  specimenTypes: string[];
  specimenTypeSnomedCodes: string[];
  sourceDescriptions: string[];
  specimenSources: string[];
  sourceSnomedCodes: string[];
  districts: string[];
  physicianNpis: string[];
  collectionDates: string[];
  collectionTimes: string[];
  testLocations: string[];
  races: string[];
  ethnicities: string[];
  entryNumbers: string[];
  envs: string[];
  extractFlags: string[];
};

const DynamicForm: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  
  // State for new dropdowns
  const [dropdownData, setDropdownData] = useState<DropdownData>({
    specimenTypes: [],
    specimenTypeSnomedCodes: [],
    sourceDescriptions: [],
    specimenSources: [],
    sourceSnomedCodes: [],
    districts: [],
    physicianNpis: [],
    collectionDates: [],
    collectionTimes: [],
    testLocations: [],
    races: [],
    ethnicities: [],
    entryNumbers: [],
    envs: [],
    extractFlags: []
  });

  // State for text fields
  const [textFields, setTextFields] = useState({
    patientFirstName: '',
    patientMiddleName: '',
    patientLastName: '',
    dob: '',
    addressLine1: '',
    addressLine2: '',
    zip: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const loadDropdownData = async () => {
      try {
        const [
          specimenTypes,
          specimenTypeSnomedCodes,
          sourceDescriptions,
          specimenSources,
          sourceSnomedCodes,
          districts,
          physicianNpis,
          collectionDates,
          collectionTimes,
          testLocations,
          races,
          ethnicities,
          entryNumbers,
          envs,
          extractFlags
        ] = await Promise.all([
          fetchDropdownData('SPECIMEN_TYPE'),
          fetchDropdownData('SPECIMEN_TYPE_SNOMED_CODE'),
          fetchDropdownData('SOURCE_DESCRIPTION'),
          fetchDropdownData('SPECIMEN_SOURCE'),
          fetchDropdownData('SOURCE_SNOMED_CODE'),
          fetchDropdownData('DISTRICT'),
          fetchDropdownData('PHYSICIAN_NPI'),
          fetchDropdownData('COLLECTION_DATE'),
          fetchDropdownData('COLLECTION_TIME'),
          fetchDropdownData('TEST_LOCATION'),
          fetchDropdownData('RACE'),
          fetchDropdownData('ETHNICITY'),
          fetchDropdownData('ENTRY_NUMBER'),
          fetchDropdownData('ENV'),
          fetchDropdownData('EXTRACT_FLAG')
        ]);

        setDropdownData({
          specimenTypes,
          specimenTypeSnomedCodes,
          sourceDescriptions,
          specimenSources,
          sourceSnomedCodes,
          districts,
          physicianNpis,
          collectionDates,
          collectionTimes,
          testLocations,
          races,
          ethnicities,
          entryNumbers,
          envs,
          extractFlags
        });
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    loadOrders();
    loadDropdownData();
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleOrderChange = (event: SelectChangeEvent<string>) => {
    const orderCode = event.target.value;
    setSelectedOrder(orderCode);
    // You can set orderDetails based on the selectedOrder if needed.
  };

  const handleTextChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFields({
      ...textFields,
      [field]: event.target.value
    });
  };

  const handleAdd = async () => {
    // Implement functionality to add the record if needed
  };

  const handleDiscard = () => {
    setSelectedOrder('');
    setTextFields({
      patientFirstName: '',
      patientMiddleName: '',
      patientLastName: '',
      dob: '',
      addressLine1: '',
      addressLine2: '',
      zip: '',
      email: '',
      phoneNumber: ''
    });
    // Optionally reset order details if needed
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ width: 600, flexShrink: 0, '& .MuiDrawer-paper': { width: 600, boxSizing: 'border-box' } }}
      >
        <Box sx={{ padding: 2 }}>
          {/* Order Code Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Order Code</InputLabel>
            <Select value={selectedOrder} onChange={handleOrderChange}>
              {orders.map(order => (
                <MenuItem key={order.order_code} value={order.order_code}>
                  {order.order_code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Display selected order details */}
          {selectedOrder && (
            <Box mt={2}>
              <TextField
                fullWidth
                margin="normal"
                label="Order Name"
                value={orders.find(order => order.order_code === selectedOrder)?.order_name || ''}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Order LOINC Code"
                value={orders.find(order => order.order_code === selectedOrder)?.order_loinc_code || ''}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="LOINC Name"
                value={orders.find(order => order.order_code === selectedOrder)?.loinc_name || ''}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Order LOINC Description"
                value={orders.find(order => order.order_code === selectedOrder)?.order_loinc_description || ''}
                InputProps={{ readOnly: true }}
              />
            </Box>
          )}

          {/* Additional Dropdowns */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Specimen Type</InputLabel>
            <Select>
              {dropdownData.specimenTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Specimen Type SNOMED Code</InputLabel>
            <Select>
              {dropdownData.specimenTypeSnomedCodes.map(code => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Source Description</InputLabel>
            <Select>
              {dropdownData.sourceDescriptions.map(description => (
                <MenuItem key={description} value={description}>
                  {description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Specimen Source</InputLabel>
            <Select>
              {dropdownData.specimenSources.map(source => (
                <MenuItem key={source} value={source}>
                  {source}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Source SNOMED Code</InputLabel>
            <Select>
              {dropdownData.sourceSnomedCodes.map(code => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>District</InputLabel>
            <Select>
              {dropdownData.districts.map(district => (
                <MenuItem key={district} value={district}>
                  {district}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Physician NPI</InputLabel>
            <Select>
              {dropdownData.physicianNpis.map(npi => (
                <MenuItem key={npi} value={npi}>
                  {npi}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Collection Date</InputLabel>
            <Select>
              {dropdownData.collectionDates.map(date => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Collection Time</InputLabel>
            <Select>
              {dropdownData.collectionTimes.map(time => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Test Location</InputLabel>
            <Select>
              {dropdownData.testLocations.map(location => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
           {/* Text Fields for typing details */}
           <TextField
            fullWidth
            margin="normal"
            label="Patient First Name"
            value={textFields.patientFirstName}
            onChange={handleTextChange('patientFirstName')}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Patient Middle Name"
            value={textFields.patientMiddleName}
            onChange={handleTextChange('patientMiddleName')}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Patient Last Name"
            value={textFields.patientLastName}
            onChange={handleTextChange('patientLastName')}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Date of Birth (DOB)"
            value={textFields.dob}
            onChange={handleTextChange('dob')}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Address Line 1"
            value={textFields.addressLine1}
            onChange={handleTextChange('addressLine1')}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Address Line 2"
            value={textFields.addressLine2}
            onChange={handleTextChange('addressLine2')}
          />

          <TextField
            fullWidth
            margin="normal"
            label="ZIP Code"
            value={textFields.zip}
            onChange={handleTextChange('zip')}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={textFields.email}
            onChange={handleTextChange('email')}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            value={textFields.phoneNumber}
            onChange={handleTextChange('phoneNumber')}
          />


          <FormControl fullWidth margin="normal">
            <InputLabel>Race</InputLabel>
            <Select>
              {dropdownData.races.map(race => (
                <MenuItem key={race} value={race}>
                  {race}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Ethnicity</InputLabel>
            <Select>
              {dropdownData.ethnicities.map(ethnicity => (
                <MenuItem key={ethnicity} value={ethnicity}>
                  {ethnicity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Entry Number</InputLabel>
            <Select>
              {dropdownData.entryNumbers.map(entry => (
                <MenuItem key={entry} value={entry}>
                  {entry}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>ENV</InputLabel>
            <Select>
              {dropdownData.envs.map(env => (
                <MenuItem key={env} value={env}>
                  {env}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Extract Flag</InputLabel>
            <Select>
              {dropdownData.extractFlags.map(flag => (
                <MenuItem key={flag} value={flag}>
                  {flag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleAdd}>Add</Button>
          <Button variant="outlined" onClick={handleDiscard}>Discard</Button>
        </Box>
      </Drawer>
    </>
  );
};

export default DynamicForm;
