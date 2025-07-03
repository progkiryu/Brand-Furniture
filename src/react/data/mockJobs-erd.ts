// mockJobs-erd.ts
import type { Job, SubJob, Frame, Cushion, Upholstery } from '../types/jobTypes-erd';

// Helper function to generate a MongoDB-style ID
// This is a client-side simulation and won't be cryptographically secure
// or include machine/process IDs like a real MongoDB ObjectId.
let counter = 0; // Simple counter for uniqueness within the same millisecond
function generateMongoStyleId(): string {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16); // 4 bytes timestamp
    // Generate a 16-character random hex string (equivalent to 8 bytes)
    const random = Math.floor(Math.random() * 0xFFFFFFFFFFFFFFFF).toString(16).padStart(16, '0');
    // Simple incrementing counter for 3 bytes (6 hex characters)
    counter = (counter + 1) % 0xFFFFFF; // Ensure it wraps around
    const increment = counter.toString(16).padStart(6, '0');

    // Combine to form a 24-character hex string
    return timestamp.padStart(8, '0') + random.substring(0, 10) + increment; // Take 5 bytes from random, 3 from increment
}

// --- 1. mockJobsData (simulating the Job table) ---
export const mockJobsData: Job[] = [{
    jobId: '507f1f77bcf86cd799439011',
    invoiceId: 2826,
    client: 'FAF Woodwork',
    name: 'H064 Exterior Bench',
    type: 'Commercial',
    due: '2025-10-06',
},
{
    jobId: '66bd44f91e6a9e9d1b3c77cf',
    invoiceId: 2835,
    client: 'FAF Woodwork',
    name: '7 Thompson St, Tamarama',
    type: 'Commercial',
    due: '2025-10-06',
},
{
    jobId: '66bd4591c5f4d0872ae71f6b',
    invoiceId: 2812,
    client: 'Mobilia',
    name: '25 Bourke St, Alexandra Banquette seats only for public spaces',
    type: 'Production',
    due: '2025-02-24',
},
];

// --- 2. mockSubJobsData (simulating the SubJob table) ---
export const mockSubJobsData: SubJob[] = [
    // SubJobs for jobId: '507f1f77bcf86cd799439011'
    {
        jobId: '507f1f77bcf86cd799439011',
        subJobId: 1, // SubJob ID within this Job
        subJobDetail: 'Custom banquette for garden 2524mmL (RHF) 2900mm (middle straight cushions) 2109mmL (LHF) 7533mm',
        note: 'NEED TO ORDER OUTDOOR FOAM & BACK CUSHIONS FILLS FROM SHARNI PLUS FABRIC 2 Sheets DFMED 220mm Templates to be supplied by FAF',
        file: '',
        depositAmount: 1000,
        depositDate: '03/04/2025',
        paidInFull: '24/04/2025',
        liaison: 'NK',
        paymentNote: 'null',
    },
    {
        jobId: '507f1f77bcf86cd799439011',
        subJobId: 2, // SubJob ID within this Job
        subJobDetail: '10 x Back cushions - 325mmH x 150mm thick Plain stitch with seams in corners 1 x 1039mmL 1x 1070mmL 1 x 441mmL 4 x 725mmL (along straight) 1 x 601mmL 2 x 1100mmL',
        note: '',
        file: '',
        depositAmount: 1000,
        depositDate: '03/04/2025',
        paidInFull: '24/04/2025',
        liaison: 'NK',
        paymentNote: 'null',
    },

    // SubJobs for jobId: '66bd44f91e6a9e9d1b3c77cf'
    {
        jobId: '66bd44f91e6a9e9d1b3c77cf',
        subJobId: 1, // SubJob ID within this Job
        subJobDetail: 'Upholstered Custom Seat Built in Banquette - 1/2 donut shape Backs 495mmH x 75mm thick foam on front and 10mm on top Individual fluting with built in rake Seats 600mmD x 210mm thick 150mm foam on top with 210mmH x 50mmD profile Foam and Dacron included 50mm foam on back EN36-130 150mm foam on seat EN36-130',
        note: 'Seat & back substrates to be supplied by FAF',
        file: '',
        depositAmount: 1000,
        depositDate: '',
        paidInFull: '',
        liaison: 'NK',
        paymentNote: 'null',
    },
    {
        jobId: '66bd44f91e6a9e9d1b3c77cf',
        subJobId: 2, // SubJob ID within this Job
        subJobDetail: '2 sliding Doors 850mmW x 540mmH - upholstered in Living area Frames to be supplied by FAF and discussed with Brand for clean finish',
        note: 'Substrates to be supplied by FAF',
        file: '',
        depositAmount: 1000,
        depositDate: '14/04/2025',
        paidInFull: '24/04/2025',
        liaison: 'NK',
        paymentNote: 'null',
    },

    // SubJobs for jobId: '66bd4591c5f4d0872ae71f6b'
    {
        jobId: '66bd4591c5f4d0872ae71f6b',
        subJobId: 1, // SubJob ID within this Job
        subJobDetail: 'Loose Seat Cushions Front Foyer 5 seat cushions - various sizes - 11l/m Back Foyer 2 seat cushions - various sizes Specified fabric to be used on both sides though have advised Luke that one of the foyers may not be double sided',
        note: '75mm firm foam for commercial Top stitch & Border for all cushions to match other seating on site Velcro to be used to fix cushions to metal seat framing. Create patterns for all 8 seats Delivery & placement of 8 seat cushions',
        file: '',
        depositAmount: 1000,
        depositDate: '23/04/2025',
        paidInFull: '',
        liaison: 'NK',
        paymentNote: 'null',
    }
];

// --- 3. mockFrameUpholsteryData (simulating the Frame table) ---
export const mockFrame: Frame[] = [
    {
        jobId: '507f1f77bcf86cd799439011', subJobId: 1, frameId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', description: 'null', ordereddate: 'null', expecteddate: '22/05/2025', receiveddate: 'null',
    },
    {
        jobId: '507f1f77bcf86cd799439011', subJobId: 2, frameId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', description: 'null', ordereddate: 'null', expecteddate: '22/05/2025', receiveddate: 'null',
    },
    {
        jobId: '66bd44f91e6a9e9d1b3c77cf', subJobId: 1, frameId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', description: 'null', ordereddate: 'null', expecteddate: '22/05/2025', receiveddate: 'null',
    },
    {
        jobId: '66bd44f91e6a9e9d1b3c77cf', subJobId: 2, frameId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', description: 'null', ordereddate: 'null', expecteddate: '22/05/2025', receiveddate: 'null',
    },
    {
        jobId: '66bd4591c5f4d0872ae71f6b', subJobId: 1, frameId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'null', description: 'null', ordereddate: 'null', expecteddate: 'null', receiveddate: 'null',
    },
];

// --- 4. mockCushionData (simulating the Cushion table) ---
export const mockCushionData: Cushion[] = [
    {
        jobId: '507f1f77bcf86cd799439011', subJobId: 1, cushionId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type: 'B', description: 'null', ordereddate: 'null', expecteddate: 'null', receiveddate: 'null',
    },
    {
        jobId: '507f1f77bcf86cd799439011', subJobId: 1, cushionId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type: 'S', description: 'null', ordereddate: 'null', expecteddate: 'null', receiveddate: 'null',
    },
    {
        jobId: '507f1f77bcf86cd799439011', subJobId: 2, cushionId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type: 'B', ordereddate: '02/05/2025', expecteddate: 'null', receiveddate: '15/05/2025', description: 'null',
    },
    {
        jobId: '507f1f77bcf86cd799439011', subJobId: 2, cushionId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type: 'S', description: 'null', ordereddate: 'null', expecteddate: 'null', receiveddate: 'null',
    },
    {
        jobId: '66bd44f91e6a9e9d1b3c77cf', subJobId: 1, cushionId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type: 'B', description: 'null', ordereddate: 'null', expecteddate: 'null', receiveddate: 'null',
    },
    {
        jobId: '66bd44f91e6a9e9d1b3c77cf', subJobId: 1, cushionId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type: 'S', description: 'null', ordereddate: 'null', expecteddate: 'null', receiveddate: 'null',
    },
    {
        jobId: '66bd44f91e6a9e9d1b3c77cf', subJobId: 2, cushionId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type: 'B', description: 'null', ordereddate: 'null', expecteddate: 'null', receiveddate: 'null',
    },
    {
        jobId: '66bd44f91e6a9e9d1b3c77cf', subJobId: 2, cushionId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type: 'S', description: 'null', ordereddate: 'null', expecteddate: 'null', receiveddate: 'null',
    },
    {
        jobId: '66bd4591c5f4d0872ae71f6b', subJobId: 1, cushionId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'null', type: 'B', description: 'null', ordereddate: 'null', expecteddate: 'null', receiveddate: 'null',
    },
    {
        jobId: '66bd4591c5f4d0872ae71f6b', subJobId: 1, cushionId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'null', type: 'S', description: 'null', ordereddate: 'null', expecteddate: 'null', receiveddate: 'null',
    },
];

// --- 5. mockUpholsteryData (simulating the Upholstery table) ---
export const mockUpholsteryData: Upholstery[] = [
    {
        jobId: '507f1f77bcf86cd799439011', subJobId: 1, upholsteryId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type:'fabric', description: 'Warwick - Rottnest - Sand', ordereddate: 'null', expecteddate: 'null', receiveddate: '02/05/2025',
    },
    {
        jobId: '507f1f77bcf86cd799439011', subJobId: 2, upholsteryId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type:'fabric', description: 'Warwick - Rottnest - Sand', ordereddate: 'null', expecteddate: 'null', receiveddate: '02/05/2025',
    },
    {
        jobId: '66bd44f91e6a9e9d1b3c77cf', subJobId: 1, upholsteryId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type:'fabric', description: 'FAB2 - WESTBURY TEXTILES (BACK) STYLE: MANHATTAN COL: PUTTY, FAB 2 3.5 l/m', ordereddate: 'null', expecteddate: 'null', receiveddate: '05/05/2025',
    },
    {
        jobId: '66bd44f91e6a9e9d1b3c77cf', subJobId: 1, upholsteryId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type:'fabric', description: 'FAB3 - INSTYLE - ZONE Col: STUDY (SEAT) [6m]', ordereddate: '15/04/2025', expecteddate: 'null', receiveddate: '22/04/2025',
    },
    {
        jobId: '66bd44f91e6a9e9d1b3c77cf', subJobId: 2, upholsteryId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'FAF', type:'fabric', description: 'FAB-1 South Pacific - DEDAR STYLE: WIDE LINEN LEGGERO T23009 COLOUR: COL 002 [1m]', ordereddate: '15/04/2025', expecteddate: 'null', receiveddate: '21/05/2025',
    },
    {
        jobId: '66bd4591c5f4d0872ae71f6b', subJobId: 1, upholsteryId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'null', type:'fabric', description: 'Front Foyer Tiger Eye Lam (11 l/m)', ordereddate: 'null', expecteddate: 'null', receiveddate: '13/05/2025',
    },
    {
        jobId: '66bd4591c5f4d0872ae71f6b', subJobId: 1, upholsteryId: generateMongoStyleId(), // New MongoDB-style PK
        supplier: 'null', type:'fabric', description: 'Back Foyer Heath Lam (5 l/m) ', ordereddate: 'null', expecteddate: 'null', receiveddate: '19/05/2025',
    },
];