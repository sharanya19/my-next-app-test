// appRoutes.ts

// Fetch the base URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Log the base URL for debugging purposes
console.log('NEXT_PUBLIC_BASE_URL:', BASE_URL);

// Define API paths relative to the base URL
const API_PATH = {
    // Authentication routes
    LOGIN: `${BASE_URL}api/token/`,
    REFRESH_TOKEN: `${BASE_URL}api/token/`,

    // API routes based on Django router
    ORDERS: `${BASE_URL}api/orders/`,
    SPECIMENS: `${BASE_URL}api/specimens/`,
    SUBMISSIONS: `${BASE_URL}api/submissions/`,
    PATIENTS: `${BASE_URL}api/patients/`,


    // Dropdown endpoints
    SPECIMEN_TYPE: `${BASE_URL}api/dropdown/specimen-type/`,
    SPECIMEN_TYPE_SNOMED_CODE: `${BASE_URL}api/dropdown/specimen-type-snomed-code/`,
    SOURCE_DESCRIPTION: `${BASE_URL}api/dropdown/source-description/`,
    SPECIMEN_SOURCE: `${BASE_URL}api/dropdown/specimen-source/`,
    SOURCE_SNOMED_CODE: `${BASE_URL}api/dropdown/source-snomed-code/`,
    DISTRICT: `${BASE_URL}api/dropdown/district/`,
    PHYSICIAN_NPI: `${BASE_URL}api/dropdown/physician-npi/`,
    COLLECTION_DATE: `${BASE_URL}api/dropdown/collection-date/`,
    COLLECTION_TIME: `${BASE_URL}api/dropdown/collection-time/`,
    TEST_LOCATION: `${BASE_URL}api/dropdown/test-location/`,
    PATIENT_FIRST_NAME: `${BASE_URL}api/dropdown/patient-first-name/`,
    PATIENT_MIDDLE_NAME: `${BASE_URL}api/dropdown/patient-middle-name/`,
    PATIENT_LAST_NAME: `${BASE_URL}api/dropdown/patient-last-name/`,
    PATIENT_GENDER: `${BASE_URL}api/dropdown/patient-gender/`,
    DOB: `${BASE_URL}api/dropdown/dob/`,
    ADDRESS_LINE1: `${BASE_URL}api/dropdown/address-line1/`,
    ADDRESS_LINE2: `${BASE_URL}api/dropdown/address-line2/`,
    CITY: `${BASE_URL}api/dropdown/city/`,
    STATE: `${BASE_URL}api/dropdown/state/`,
    ZIP: `${BASE_URL}api/dropdown/zip/`,
    EMAIL: `${BASE_URL}api/dropdown/email/`,
    PHONE_NUMBER: `${BASE_URL}api/dropdown/phone-number/`,
    RACE: `${BASE_URL}api/dropdown/race/`,
    ETHNICITY: `${BASE_URL}api/dropdown/ethnicity/`,
    ENTRY_NUMBER: `${BASE_URL}api/dropdown/entry-number/`,
    ENV: `${BASE_URL}api/dropdown/env/`,
    EXTRACT_FLAG: `${BASE_URL}api/dropdown/extract-flag/`,
};

export {
    BASE_URL,
    API_PATH
};
