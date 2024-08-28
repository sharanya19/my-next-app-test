import { useState } from 'react';
import { Container, Button, Typography, Box, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import DynamicForm from '../components/DynamicForm';

// Define the type for your records
interface Record {
  id: number;
  orderCode: string;
  orderName: string;
  orderLOINCCode: string;
  loincName: string;
  orderLOINCDescription: string;
  specimenID: string;
  specimenType: string;
  specimenTypeSNOMEDCode: string;
  sourceDescription: string;
  specimenSource: string;
  sourceSNOMEDCode: string;
  submitterCode: string;
  district: string;
  orderingPhysicianNPI: string;
  collectionDate: string;
  collectionTime: string;
  testLocation: string;
  patientID: string;
  patientFirstName: string;
  patientMiddleName: string;
  patientLastName: string;
  patientGender: string;
  dob: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phoneNumber: string;
  race: string;
  ethnicity: string;
  entry: string;
  env: string;
  extractFlag: string;
}

const HomePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [records, setRecords] = useState<Record[]>([]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'orderCode', headerName: 'Order Code', width: 150 },
    { field: 'orderName', headerName: 'Order Name', width: 200 },
    { field: 'orderLOINCCode', headerName: 'Order LOINC Code', width: 200 },
    { field: 'loincName', headerName: 'LOINC Name', width: 200 },
    { field: 'orderLOINCDescription', headerName: 'Order LOINC Description', width: 250 },
    { field: 'specimenID', headerName: 'Specimen ID', width: 150 },
    { field: 'specimenType', headerName: 'Specimen Type', width: 150 },
    { field: 'specimenTypeSNOMEDCode', headerName: 'Specimen Type SNOMED Code', width: 250 },
    { field: 'sourceDescription', headerName: 'Source Description', width: 200 },
    { field: 'specimenSource', headerName: 'Specimen Source', width: 200 },
    { field: 'sourceSNOMEDCode', headerName: 'Source SNOMED Code', width: 200 },
    { field: 'submitterCode', headerName: 'Submitter Code', width: 150 },
    { field: 'district', headerName: 'District', width: 200 },
    { field: 'orderingPhysicianNPI', headerName: 'Ordering Physician NPI', width: 200 },
    { field: 'collectionDate', headerName: 'Collection Date', width: 150 },
    { field: 'collectionTime', headerName: 'Collection Time', width: 150 },
    { field: 'testLocation', headerName: 'Test Location', width: 200 },
    { field: 'patientID', headerName: 'Patient ID', width: 150 },
    { field: 'patientFirstName', headerName: 'Patient First Name', width: 200 },
    { field: 'patientMiddleName', headerName: 'Patient Middle Name', width: 200 },
    { field: 'patientLastName', headerName: 'Patient Last Name', width: 200 },
    { field: 'patientGender', headerName: 'Patient Gender', width: 150 },
    { field: 'dob', headerName: 'Date of Birth', width: 150 },
    { field: 'addressLine1', headerName: 'Address Line 1', width: 250 },
    { field: 'addressLine2', headerName: 'Address Line 2', width: 250 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'zip', headerName: 'ZIP Code', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 200 },
    { field: 'race', headerName: 'Race', width: 150 },
    { field: 'ethnicity', headerName: 'Ethnicity', width: 150 },
    { field: 'entry', headerName: 'Entry', width: 200 },
    { field: 'env', headerName: 'Environment', width: 150 },
    { field: 'extractFlag', headerName: 'Extract Flag', width: 150 },
  ];

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#e0f7fa',
              borderRadius: '50%',
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            THA
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              marginLeft: 2,
              fontWeight: 'bold',
              color: '#1976d2',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
            }}
          >
            Test Application
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleFormVisibility}
          sx={{ borderRadius: 20, paddingX: 4, paddingY: 2 }}
        >
          {isFormVisible ? 'Hide Form' : 'Add Form'}
        </Button>
      </Box>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          backgroundColor: '#fafafa', // Light grey background color
          width: '100%',
          maxWidth: 1200,
          margin: 'auto',
          marginLeft: '-20px',
          transform: 'translateX(-20px)',
        }}
      >
        {isFormVisible && (
          <DynamicForm />
        )}
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={records as GridRowsProp}
            columns={columns}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default HomePage;
