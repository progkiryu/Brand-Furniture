//Ignore this file

// import { useState } from 'react';
// import {
//   Table, Modal, Tabs, Text, Group, Badge, ActionIcon, Accordion, Button,
// } from '@mantine/core';
// import { IconPlus, IconTrash } from '@tabler/icons-react';

// // import the type and data
// import type { Job } from '../data/mockJobs'; // Adjust path as needed
// import { mockJobs as jobs } from '../data/mockJobs';




// /* ─────────────── Component ─────────────── */
// export default function SchedulePage() {
  

//   /* state */
//   const [opened, setOpened] = useState(false);
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [subIdx, setSubIdx] = useState(0);
//   const [frameIdx, setFrameIdx] = useState(0);
//   const [cushionIdx, setCushionIdx] = useState(0);
//   const [upholsteryIdx, setUpholsteryIdx] = useState(0);
//   const [openedModalId, setOpenedModalId] = useState<number | null>(null);

//   /* helpers */
//   const openModalFor = (job: Job) => {
//     setSelectedJob(structuredClone(job)); // clone to keep demo data immutable
//     setSubIdx(0);
//     setFrameIdx(0);
//     setCushionIdx(0);
//     setUpholsteryIdx(0);
//     setOpened(true);
//   };

//   const addSubJob = () => {
//     if (!selectedJob) return;

//     const newSubJobs = [
//       ...selectedJob.subJobs,
//       {
//         id: selectedJob.subJobs.length + 1,
//         jobdetail: '',
//         note: '',
//         file: '',
//         label: '',
//         frame: [],
//         cushion: [],
//         upholstery: [],
//         depositAmount: 0,
//         depositDate: '',
//         paidInFull: '',
//         liaison: '',
//         paymentNote: '',
//       },
//     ];

//     // Renumber to ensure 1..n
//     const normalized = newSubJobs.map((s, i) => ({ ...s, id: i + 1 }));

//     setSelectedJob({ ...selectedJob, subJobs: normalized });
//     setSubIdx(normalized.length - 1);    // jump to the new one
//   };

//   const removeSubJob = () => {
//     if (!selectedJob || selectedJob.subJobs.length < 1) return;

//     // drop the current sub-job
//     const remaining = selectedJob.subJobs.filter((_, i) => i !== subIdx);

//     // Renumber 1..n
//     const normalized = remaining.map((s, i) => ({ ...s, id: i + 1 }));

//     // adjust index (stay on same numeric position if possible)
//     const newIdx = subIdx >= normalized.length ? normalized.length - 1 : subIdx;

//     setSelectedJob({ ...selectedJob, subJobs: normalized });
//     setSubIdx(newIdx);
//   };

//   const allSubJobs = jobs.flatMap((job) =>
//     job.subJobs.map((subjob) => ({
//       ...subjob,
//       jobId: job.id, // Add the parent job's ID for reference if needed
//     }))
//   );

//   /* rows */
//   // const rows = jobs.map(j => (
//   //   <Table.Tr key={j.id} style={{ cursor: 'pointer' }} onClick={() => openModalFor(j)}>
//   //     <Table.Td>{j.id}</Table.Td>
//   //     <Table.Td>{j.client}</Table.Td>
//   //     <Table.Td>{j.name}</Table.Td>
//   //     <Table.Td>{j.due}</Table.Td>
//   //   </Table.Tr>
//   // ));

//   const rows = jobs.map(j => (
//     <Table.Tr key={j.id} style={{ cursor: 'pointer' }} onClick={() => openModalFor(j)}>
//       <Table.Td>{j.id}</Table.Td>
//       <Table.Td>{j.client}</Table.Td>
//       <Table.Td>{j.name}</Table.Td>
//       <Table.Td>{j.due}</Table.Td>
//     </Table.Tr>
//   ));

//   const items = jobs.map((j) => (
//     <Accordion.Item key={j.id} value={j.name}>
//       <Accordion.Control>
//         {
//           <Table.Tr key={j.id} style={{ cursor: 'pointer' }} onClick={() => openModalFor(j)}>
//             <Table.Td>{j.id}</Table.Td>
//             <Table.Td>{j.client}</Table.Td>
//             <Table.Td>{j.name}</Table.Td>
//             <Table.Td>{j.due}</Table.Td>
//           </Table.Tr>
//         }
//       </Accordion.Control>
//       <Accordion.Panel>{j.name}</Accordion.Panel>
//     </Accordion.Item>
//   ));
  

//   return (
//     <>
//       <div className="sp-right-container">
//         <div className="sp-actions-container">
//           <div className="sp-search-container">
//               <input type="search" placeholder="Search"></input>
//           </div>
//           <div className="sp-filter-container">
//               <select name="cars" id="cars">
//                   <option value="date">by date</option>
//                   <option value="priority">by priority</option>
//                   <option value="chair">by chair</option>
//                   <option value="type">by type</option>
//               </select>
//           </div>
//           <div className="sp-archive-btn-container">
//               <p>Archive</p>
              
//           </div>
//           <div className="sp-color-selection">
//             <p>Color Selector</p>
//           </div>
//         </div>

        
        
//         <div className="sp-schedule-container">
//           <Accordion multiple>
//             {items}
//             <Table highlightOnHover withTableBorder>
//               <Table.Thead>
//                 <Table.Tr>
//                   <Table.Th>ID</Table.Th>
//                   <Table.Th>Client</Table.Th>
//                   <Table.Th>Name</Table.Th>
//                   <Table.Th>Due</Table.Th>
//                 </Table.Tr>
//               </Table.Thead>
//               <Table.Tbody>{rows}</Table.Tbody>
//             </Table>
//           </Accordion>
          
//         </div>
//       </div>      
      
      

//       <Modal
//         opened={opened}
//         onClose={() => setOpened(false)}
//         title={`#${selectedJob?.id} - ${selectedJob?.client}`}
//         size="xl"
//         centered
//       >
//         {selectedJob && (
//           <>
//             {/* sub-job selector row */}
//             <Group align="center" mb="sm" wrap="nowrap">
//               <Text fw={600}>Job:</Text>
//               {selectedJob.subJobs.map((s, i) => (
//                 <Badge
//                   key={s.id}
//                   radius="sm"
//                   size="lg"
//                   variant={i === subIdx ? 'filled' : 'light'}
//                   onClick={() => setSubIdx(i)}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   {s.id}
//                 </Badge>
//               ))}
//               <ActionIcon variant="light" size="sm" onClick={addSubJob}>
//                 <IconPlus size={14} />
//               </ActionIcon>
//               <ActionIcon
//                 variant="light"
//                 size="sm"
//                 color="red"
//                 disabled={selectedJob.subJobs.length < 1}
//                 onClick={removeSubJob}
//               >
//                 <IconTrash size={14} />
//               </ActionIcon>
//             </Group>

//             {/* tabset for the chosen sub-job */}
//             <Tabs defaultValue="detail">
//               <Tabs.List>
//                 <Tabs.Tab value="detail">Detail</Tabs.Tab>
//                 <Tabs.Tab value="frame">Frame</Tabs.Tab>
//                 <Tabs.Tab value="cushion">Cushion</Tabs.Tab>
//                 <Tabs.Tab value="upholstery">Upholstery</Tabs.Tab>
//                 <Tabs.Tab value="admin">Admin</Tabs.Tab>
//               </Tabs.List>

//               <Tabs.Panel value="detail" pt="xs">
//                 <Text>Job Details</Text>
//                 <Text>{selectedJob.subJobs[subIdx].jobdetail}</Text>
//                 <br></br>
//                 <Text>Notes</Text>
//                 <Text>{selectedJob.subJobs[subIdx].note}</Text>
//               </Tabs.Panel>
//               <Tabs.Panel value="frame" pt="xs">
//                 <Text>Supplier</Text>
//                 <Text>{selectedJob.subJobs[subIdx].frame[0].supplier}</Text>
//                 <br></br>
//                 <Text>Description</Text>
//                 <Text>{selectedJob.subJobs[subIdx].frame[0].description}</Text>
//                 <br></br>
//                 <Text>Ordered Date</Text>
//                 <Text>{selectedJob.subJobs[subIdx].frame[0].ordereddate}</Text>
//                 <br></br>
//                 <Text>Expected Date</Text>
//                 <Text>{selectedJob.subJobs[subIdx].frame[0].expecteddate}</Text>
//                 <br></br>
//                 <Text>Received Date</Text>
//                 <Text>{selectedJob.subJobs[subIdx].frame[0].receiveddate}</Text>
//               </Tabs.Panel>
//               <Tabs.Panel value="cushion" pt="xs">
//                 <Text>Supplier</Text>
//                 <Text>{selectedJob.subJobs[subIdx].cushion[0].supplier}</Text>
//                 <br></br>
//                 <Text>Type</Text>
//                 <Text>{selectedJob.subJobs[subIdx].cushion[0].type}</Text>
//                 <br></br>
//                 <Text>Description</Text>
//                 <Text>{selectedJob.subJobs[subIdx].cushion[0].description}</Text>
//                 <br></br>
//                 <Text>Ordered Date</Text>
//                 <Text>{selectedJob.subJobs[subIdx].cushion[0].ordereddate}</Text>
//                 <br></br>
//                 <Text>Expected Date</Text>
//                 <Text>{selectedJob.subJobs[subIdx].cushion[0].expecteddate}</Text>
//                 <br></br>
//                 <Text>Received Date</Text>
//                 <Text>{selectedJob.subJobs[subIdx].cushion[0].receiveddate}</Text>
//               </Tabs.Panel>
//               <Tabs.Panel value="upholstery" pt="xs">
//                 <Text>Supplier</Text>
//                 <Text>{selectedJob.subJobs[subIdx].upholstery[0].supplier}</Text>
//                 <br></br>
//                 <Text>Description</Text>
//                 <Text>{selectedJob.subJobs[subIdx].upholstery[0].description}</Text>
//                 <br></br>
//                 <Text>Ordered Date</Text>
//                 <Text>{selectedJob.subJobs[subIdx].upholstery[0].ordereddate}</Text>
//                 <br></br>
//                 <Text>Expected Date</Text>
//                 <Text>{selectedJob.subJobs[subIdx].upholstery[0].expecteddate}</Text>
//                 <br></br>
//                 <Text>Received Date</Text>
//                 <Text>{selectedJob.subJobs[subIdx].upholstery[0].receiveddate}</Text>
//               </Tabs.Panel>
//               <Tabs.Panel value="admin" pt="xs">
//                 <Text fw={600}>Deposit</Text>
//                 <Text>Deposit Amount</Text>
//                 <Text>{selectedJob.subJobs[subIdx].depositAmount}</Text>
//                 <Text>Deposit Date</Text>
//                 <Text>{selectedJob.subJobs[subIdx].depositDate}</Text>
//                 <Text>Paid In Full</Text>
//                 <Text>{selectedJob.subJobs[subIdx].paidInFull}</Text>
//                 <br></br>
//                 <Text fw={600}>Liaison</Text>
//                 <Text>{selectedJob.subJobs[subIdx].liaison}</Text>
//                 <br></br>
//                 <Text fw={600}>Notes</Text>
//                 <Text>{selectedJob.subJobs[subIdx].paymentNote}</Text>
//                 <br></br>
//               </Tabs.Panel>
//             </Tabs>
//           </>
//         )}
//       </Modal>
//     </>
//   );
// }

import { useState } from 'react';
import {
  Table,
  Modal,
  Tabs,
  Text,
  Group,
  Badge,
  ActionIcon,
  Accordion,
  Button,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

// Import interfaces from the new types file
import type { Job, FrameUpholstery, Cushion, SubJob } from '../types/jobTypes'; //

// Import the jobs data from mockJobs.ts
import { mockJobs as initialJobsData } from '../data/mockJobs'; //

/* ─────────────── Component ─────────────── */
function SchedulePage() {
  const jobs: Job[] = initialJobsData;

  const [openedJobModal, setOpenedJobModal] = useState<Job | null>(null);
  const [openedSubJobModalId, setOpenedSubJobModalId] = useState<number | null>(null);

  const [expandedJobIds, setExpandedJobIds] = useState<Set<number>>(new Set());

  const toggleJobAccordion = (jobId: number) => {
    setExpandedJobIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(jobId)) {
        newIds.delete(jobId);
      } else {
        newIds.add(jobId);
      }
      return newIds;
    });
  };

  const [selectedSubJobInModalIdx, setSelectedSubJobInModalIdx] = useState(0);
  const [frameIdx, setFrameIdx] = useState(0);
  const [cushionIdx, setCushionIdx] = useState(0);
  const [upholsteryIdx, setUpholsteryIdx] = useState(0);

  const openJobModalFor = (job: Job) => {
    setOpenedJobModal(structuredClone(job));
    setSelectedSubJobInModalIdx(0);
    setFrameIdx(0);
    setCushionIdx(0);
    setUpholsteryIdx(0);
  };

  const addSubJobToJobModal = () => {
    if (!openedJobModal) return;
    const newSubJobs = [
      ...openedJobModal.subJobs,
      {
        id: openedJobModal.subJobs.length + 1,
        jobdetail: '', note: '', file: '', label: '',
        frame: [], cushion: [], upholstery: [],
        depositAmount: 0, depositDate: '', paidInFull: '', liaison: '', paymentNote: '',
      },
    ];
    const normalized = newSubJobs.map((s, i) => ({ ...s, id: i + 1 }));
    setOpenedJobModal({ ...openedJobModal, subJobs: normalized });
    setSelectedSubJobInModalIdx(normalized.length - 1);
  };

  const removeSubJobFromJobModal = () => {
    if (!openedJobModal || openedJobModal.subJobs.length < 1) return;
    const remaining = openedJobModal.subJobs.filter((_, i) => i !== selectedSubJobInModalIdx);
    const normalized = remaining.map((s, i) => ({ ...s, id: i + 1 }));
    const newIdx = selectedSubJobInModalIdx >= normalized.length ? normalized.length - 1 : selectedSubJobInModalIdx;
    setOpenedJobModal({ ...openedJobModal, subJobs: normalized });
    setSelectedSubJobInModalIdx(newIdx);
  };

  const tableRows = jobs.map((job) => (
    <>
      <Table.Tr
        key={job.id}
        onClick={() => toggleJobAccordion(job.id)}
        style={{ cursor: 'pointer' }}
      >
        <Table.Td>{job.id}</Table.Td>
        <Table.Td>{job.client}</Table.Td>
        <Table.Td>{job.name}</Table.Td>
        <Table.Td>{job.due}</Table.Td>
      </Table.Tr>
      {expandedJobIds.has(job.id) && (
        <Table.Tr>
          <Table.Td colSpan={4}>
            <Accordion multiple>
              {job.subJobs.length > 0 ? (
                job.subJobs.map((subjob) => (
                  <Accordion.Item key={subjob.id} value={subjob.id.toString()}>
                    <Accordion.Control
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenedSubJobModalId(subjob.id);
                      }}
                      style={{ cursor: 'pointer' }}
                      chevron={null} // Add this prop to remove the arrow
                    >
                      <Group justify="space-between" wrap="nowrap" style={{ width: '100%' }}>
                        <Text fw={500}>SubJob {subjob.id}: {subjob.jobdetail.substring(0, 70)}...</Text>
                      </Group>
                    </Accordion.Control>
                    {/* Accordion.Panel is already removed from here */}
                  </Accordion.Item>
                ))
              ) : (
                <Text>No sub-jobs for this job.</Text>
              )}
            </Accordion>
          </Table.Td>
        </Table.Tr>
      )}
    </>
  ));

  const currentSubJobInModal = jobs.flatMap(j => j.subJobs).find(sj => sj.id === openedSubJobModalId);


  return (
    <>
      <div className="sp-right-container">
        <div className="sp-actions-container">
          <div className="sp-search-container">
            <input type="search" placeholder="Search"></input>
          </div>
          <div className="sp-filter-container">
            <select name="cars" id="cars">
              <option value="date">by date</option>
              <option value="priority">by priority</option>
              <option value="chair">by chair</option>
              <option value="type">by type</option>
            </select>
          </div>
          <div className="sp-archive-btn-container">
            <p>Archive</p>
          </div>
          <div className="sp-color-selection">
            <p>Color Selector</p>
          </div>
        </div>

        <div className="sp-schedule-container">
          <Table highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Client</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Due</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{tableRows}</Table.Tbody>
          </Table>
        </div>
      </div>

      {/* Main Job Details Modal (if you still need it, otherwise remove) */}
      <Modal
        opened={openedJobModal !== null}
        onClose={() => setOpenedJobModal(null)}
        title={`#${openedJobModal?.id} - ${openedJobModal?.client}`}
        size="xl"
        centered
      >
        {openedJobModal && (
          <>
            <Group align="center" mb="sm" wrap="nowrap">
              <Text fw={600}>Job:</Text>
              {openedJobModal.subJobs.map((s, i) => (
                <Badge
                  key={s.id}
                  radius="sm"
                  size="lg"
                  variant={i === selectedSubJobInModalIdx ? 'filled' : 'light'}
                  onClick={() => setSelectedSubJobInModalIdx(i)}
                  style={{ cursor: 'pointer' }}
                >
                  {s.id}
                </Badge>
              ))}
              <ActionIcon variant="light" size="sm" onClick={addSubJobToJobModal}>
                <IconPlus size={14} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                size="sm"
                color="red"
                disabled={openedJobModal.subJobs.length < 1}
                onClick={removeSubJobFromJobModal}
              >
                <IconTrash size={14} />
              </ActionIcon>
            </Group>

            <Tabs defaultValue="detail">
              <Tabs.List>
                <Tabs.Tab value="detail">Detail</Tabs.Tab>
                <Tabs.Tab value="frame">Frame</Tabs.Tab>
                <Tabs.Tab value="cushion">Cushion</Tabs.Tab>
                <Tabs.Tab value="upholstery">Upholstery</Tabs.Tab>
                <Tabs.Tab value="admin">Admin</Tabs.Tab>
              </Tabs.List>

              {openedJobModal.subJobs[selectedSubJobInModalIdx] && (
                <>
                  <Tabs.Panel value="detail" pt="xs">
                    <Text>Job Details</Text>
                    <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].jobdetail}</Text>
                    <br></br>
                    <Text>Notes</Text>
                    <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].note}</Text>
                  </Tabs.Panel>
                  <Tabs.Panel value="frame" pt="xs">
                    {openedJobModal.subJobs[selectedSubJobInModalIdx].frame.length > 0 ? (
                      <>
                        <Text>Supplier</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].frame[0].supplier}</Text>
                        <br></br>
                        <Text>Description</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].frame[0].description}</Text>
                        <br></br>
                        <Text>Ordered Date</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].frame[0].ordereddate}</Text>
                        <br></br>
                        <Text>Expected Date</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].frame[0].expecteddate}</Text>
                        <br></br>
                        <Text>Received Date</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].frame[0].receiveddate}</Text>
                      </>
                    ) : (
                      <Text>No frame data available.</Text>
                    )}
                  </Tabs.Panel>
                  <Tabs.Panel value="cushion" pt="xs">
                    {openedJobModal.subJobs[selectedSubJobInModalIdx].cushion.length > 0 ? (
                      <>
                        <Text>Supplier</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].cushion[0].supplier}</Text>
                        <br></br>
                        <Text>Type</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].cushion[0].type}</Text>
                        <br></br>
                        <Text>Description</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].cushion[0].description}</Text>
                        <br></br>
                        <Text>Ordered Date</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].cushion[0].ordereddate}</Text>
                        <br></br>
                        <Text>Expected Date</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].cushion[0].expecteddate}</Text>
                        <br></br>
                        <Text>Received Date</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].cushion[0].receiveddate}</Text>
                      </>
                    ) : (
                      <Text>No cushion data available.</Text>
                    )}
                  </Tabs.Panel>
                  <Tabs.Panel value="upholstery" pt="xs">
                    {openedJobModal.subJobs[selectedSubJobInModalIdx].upholstery.length > 0 ? (
                      <>
                        <Text>Supplier</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].upholstery[0].supplier}</Text>
                        <br></br>
                        <Text>Description</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].upholstery[0].description}</Text>
                        <br></br>
                        <Text>Ordered Date</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].upholstery[0].ordereddate}</Text>
                        <br></br>
                        <Text>Expected Date</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].upholstery[0].expecteddate}</Text>
                        <br></br>
                        <Text>Received Date</Text>
                        <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].upholstery[0].receiveddate}</Text>
                      </>
                    ) : (
                      <Text>No upholstery data available.</Text>
                    )}
                  </Tabs.Panel>
                  <Tabs.Panel value="admin" pt="xs">
                    <Text fw={600}>Deposit</Text>
                    <Text>Deposit Amount</Text>
                    <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].depositAmount}</Text>
                    <Text>Deposit Date</Text>
                    <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].depositDate}</Text>
                    <Text>Paid In Full</Text>
                    <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].paidInFull}</Text>
                    <br></br>
                    <Text fw={600}>Liaison</Text>
                    <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].liaison}</Text>
                    <br></br>
                    <Text fw={600}>Notes</Text>
                    <Text>{openedJobModal.subJobs[selectedSubJobInModalIdx].paymentNote}</Text>
                    <br></br>
                  </Tabs.Panel>
                </>
              )}
            </Tabs>
          </>
        )}
      </Modal>

      <Modal
        opened={openedSubJobModalId !== null}
        onClose={() => setOpenedSubJobModalId(null)}
        title={currentSubJobInModal ? `SubJob #${currentSubJobInModal.id} Details` : 'SubJob Details'}
        size="xl"
        centered
      >
        {currentSubJobInModal ? (
          <Tabs defaultValue="detail">
            <Tabs.List>
              <Tabs.Tab value="detail">Detail</Tabs.Tab>
              <Tabs.Tab value="frame">Frame</Tabs.Tab>
              <Tabs.Tab value="cushion">Cushion</Tabs.Tab>
              <Tabs.Tab value="upholstery">Upholstery</Tabs.Tab>
              <Tabs.Tab value="admin">Admin</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="detail" pt="xs">
              <Text>Job Detail: {currentSubJobInModal.jobdetail}</Text>
              <Text>Note: {currentSubJobInModal.note || 'No notes.'}</Text>
              <Text>File: {currentSubJobInModal.file || 'No file.'}</Text>
              <Text>Label: {currentSubJobInModal.label || 'No label.'}</Text>
            </Tabs.Panel>

            <Tabs.Panel value="frame" pt="xs">
              {currentSubJobInModal.frame.length > 0 ? (
                currentSubJobInModal.frame.map((f, idx) => (
                  <div key={idx} style={{ marginBottom: '1rem' }}>
                    <Text fw={600}>Frame {idx + 1}</Text>
                    <Text>Supplier: {f.supplier}</Text>
                    <Text>Description: {f.description}</Text>
                    <Text>Ordered: {f.ordereddate}</Text>
                    <Text>Expected: {f.expecteddate}</Text>
                    <Text>Received: {f.receiveddate}</Text>
                  </div>
                ))
              ) : (
                <Text>No frame data.</Text>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="cushion" pt="xs">
              {currentSubJobInModal.cushion.length > 0 ? (
                currentSubJobInModal.cushion.map((c, idx) => (
                  <div key={idx} style={{ marginBottom: '1rem' }}>
                    <Text fw={600}>Cushion {idx + 1} (Type: {c.type})</Text>
                    <Text>Supplier: {c.supplier}</Text>
                    <Text>Description: {c.description}</Text>
                    <Text>Ordered: {c.ordereddate}</Text>
                    <Text>Expected: {c.expecteddate}</Text>
                    <Text>Received: {c.receiveddate}</Text>
                  </div>
                ))
              ) : (
                <Text>No cushion data.</Text>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="upholstery" pt="xs">
              {currentSubJobInModal.upholstery.length > 0 ? (
                currentSubJobInModal.upholstery.map((u, idx) => (
                  <div key={idx} style={{ marginBottom: '1rem' }}>
                    <Text fw={600}>Upholstery {idx + 1}</Text>
                    <Text>Supplier: {u.supplier}</Text>
                    <Text>Description: {u.description}</Text>
                    <Text>Ordered: {u.ordereddate}</Text>
                    <Text>Expected: {u.expecteddate}</Text>
                    <Text>Received: {u.receiveddate}</Text>
                  </div>
                ))
              ) : (
                <Text>No upholstery data.</Text>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="admin" pt="xs">
              <Text fw={600}>Payment</Text>
              <Text>Deposit Amount: {currentSubJobInModal.depositAmount}</Text>
              <Text>Deposit Date: {currentSubJobInModal.depositDate}</Text>
              <Text>Paid In Full: {currentSubJobInModal.paidInFull}</Text>
              <Text fw={600} mt="sm">Liaison: {currentSubJobInModal.liaison}</Text>
              <Text fw={600} mt="sm">Payment Note: {currentSubJobInModal.paymentNote}</Text>
            </Tabs.Panel>
          </Tabs>
        ) : (
          <Text>SubJob data not found.</Text>
        )}
      </Modal>
    </>
  );
}


export default SchedulePage;



