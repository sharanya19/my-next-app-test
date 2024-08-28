export interface Order {
    id: number; // Assuming an ID field exists
    order_code: string;
    order_name: string;
    order_loinc_code: string;
    loinc_name: string;
    order_loinc_description: string;
  }
  
  // Example Specimen model
  export interface Specimen {
    id: number; // Assuming an ID field exists
    order: Order; // Reference to the Order model
    specimen_id: string;
    specimen_type: string;
    specimen_type_snomed_code: string;
    source_description: string;
    specimen_source: string;
    source_snomed_code: string;
  }
  
  // Example Submitter model
  export interface Submitter {
    id: number; // Assuming an ID field exists
    submitter_code: string;
    district: string;
    orderingphysiciannpi: string;
    collectiondate: string; // ISO date string
    collectiontime: string; // Time string in HH:MM:SS format
    testlocation: string;
  }
  
  // Example Patient model
  export interface Patient {
    id: number; // Assuming an ID field exists
    patient_first_name: string;
    patient_middle_name?: string; // Optional field
    patient_last_name: string;
    patient_gender: string;
    dob: string; // ISO date string
    address_line1: string;
    address_line2?: string; // Optional field
    city: string;
    state: string;
    zip: string;
    email: string;
    phone_number: string;
    race: string;
    ethnicity: string;
    entry_number: string;
    env: string;
    extract_flag: boolean;
  }