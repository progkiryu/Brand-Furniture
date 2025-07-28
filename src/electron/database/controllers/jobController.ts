import express from "express";
import schemas from "../models/schema.js";

export const getAllJobs = async (_: express.Request, res: express.Response) => {
  try {
    const allJobs = await schemas.Job.find();
    if (!allJobs) {
      res.status(404).json({ message: "Error: Failed to get all jobs." });
      return;
    }
    res.status(200).json(allJobs);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getJobById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const job = await schemas.Job.findById(id);
    if (!job) {
      res
        .status(404)
        .json({ message: `Error: Failed to find job with ID: ${id}` });
      return;
    }
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getCurrentJobs = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const currentJobs = await schemas.Job.find({
      isArchived: { $in: false },
    }).sort({ due: "ascending" }); // Sort latest first;
    if (!currentJobs) {
      res
        .status(404)
        .json({ message: "Error: Failed to retrieve current jobs." });
      return;
    }
    res.status(200).json(currentJobs);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error: Failed to retrieve jobs." });
  }
};

export const getCurrentJobsUnpinnedNullDue = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const jobs = await schemas.Job.find({
      isArchived: { $in: false },
      isPinned: { $in: false },
      due: { $ne: null },
    }).sort({ due: "ascending" });
    if (!jobs) {
      res.status(404).json({ message: "ErrorL Failed to retrieve jobs." });
      return;
    }
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const getCurrentJobsUnpinnedWithDue = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const jobs = await schemas.Job.find({
      isArchived: { $in: false },
      isPinned: { $in: false },
      due: { $eq: null },
    }).sort({ due: "ascending" });
    if (!jobs) {
      res.status(404).json({ message: "ErrorL Failed to retrieve jobs." });
      return;
    }
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const getArchivedJobs = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const archivedJobs = await schemas.Job.find({
      isArchived: { $in: true },
    }).sort({ due: "ascending" }); // Sort latest first
    if (!archivedJobs) {
      res
        .status(404)
        .json({ message: "Error: Failed to retrieve archived jobs." });
      return;
    }
    res.status(200).json(archivedJobs);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const getPinnedJobs = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const pinnedJobs = await schemas.Job.find({
      isPinned: { $in: true },
    }).sort({ due: "ascending" }); // Sort latest first
    if (!pinnedJobs) {
      res
        .status(404)
        .json({ message: "Error: Failed to retrieve pinned jobs." });
      return;
    }
    res.status(200).json(pinnedJobs);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const getPinnedJobsNullDue = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const jobs = await schemas.Job.find({
      isPinned: { $in: true },
      due: { $eq: null },
    }).sort({ due: "ascending" });
    if (!jobs) {
      res.status(404).json({ message: "Error: Failed to retrived jobs." });
      return;
    }
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const getUniqueTypes = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const uniqueTypes = await schemas.Job.distinct("type").sort({
      type: "ascending",
    });
    if (!uniqueTypes) {
      res
        .status(404)
        .json({ message: "Error: Failed to retrieve unique job types." });
    }
    res.status(200).json(uniqueTypes);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const insertJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const result = await schemas.Job.create(req.body);
    if (!result) {
      throw new Error("Could not insert new Job!");
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getJobsByMonthAndYearNumber = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const jobMonth: number = req.body.monthNumber;
    const jobYear: number = req.body.yearNumber;
    if (!jobMonth || !jobYear) {
      res.status(404).json({ message: "Error: Failed to provide fields." });
      return;
    }
    // Search for jobs that meet the criteria
    const jobs = await schemas.Job.find({
      $expr: {
        $and: [
          {
            $eq: [
              {
                $month: "$due",
              },
              jobMonth,
            ],
          },
          {
            $eq: [
              {
                $year: "$due",
              },
              jobYear,
            ],
          },
        ],
      },
    });
    if (!jobs) {
      // No jobs meet criteria, send empty array
      res.status(200).json([]);
      return;
    }
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const getJobByTypeByDate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const type: String = req.body.type;
    const startDate: String = req.body.startDate;
    const endDate: String = req.body.endDate;
    if (!type || !startDate || !endDate) {
      res.status(404).json({ message: "Error: Failed to provide fields." });
      return;
    }
    // Search for jobs that meet criteria
    const jobs = await schemas.Job.find({
      due: { $gte: startDate, $lte: endDate },
      type: { $in: type },
    });
    if (!jobs) {
      res.status(404).json({ message: "Error: Failed to find any jobs." });
      return;
    }
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const getFilteredJobsByDate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const startDate: String = req.body.startDate;
    const endDate: String = req.body.endDate;
    if (!startDate || !endDate) {
      res.status(404).json({ message: "Error: Failed to provide fields." });
      return;
    }
    // Search for subJobs within specified range
    const jobs = await schemas.Job.find({
      due: { $gte: startDate, $lte: endDate },
    }).sort({ due: "ascending" }); // sort earliest due first
    if (!jobs) {
      res
        .status(404)
        .json({ message: "Error: Failed to find any filtered jobs." });
      return;
    }
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const getFilteredJobsByType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const type: String = req.body.type;
    if (!type) {
      res.status(404).json({ message: "Error: Failed to provide fields." });
      return;
    }
    // Search for subJobs within specified range
    const jobs = await schemas.Job.find({
      type: { $in: type },
    }).sort({ due: "ascending" }); // sort earliest due first
    if (!jobs) {
      res
        .status(404)
        .json({ message: "Error: Failed to find any filtered jobs." });
      return;
    }
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const updateJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.body._id;
    if (!id) {
      res.status(404).json({ message: "Error: Failed to provide job ID!" });
      return;
    }
    const result = await schemas.Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!result) {
      res.status(404).json({
        message: `Error: Failed to find job with ID: ${id}! Or could not process request.`,
      });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const removeJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    // Check if job exists
    const job = await schemas.Job.findById(id);
    if (!job) {
      res
        .status(404)
        .json({ message: `Error: Failed to find job with ID: ${id}` });
      return;
    }
    // -------------------- Delete Dependencies --------------------
    for (let i = 0; i < job.subJobList.length; i++) {
      const subJobId = job.subJobList[i].toString();

      // Find subjob
      const subJob = await schemas.SubJob.findById(subJobId);
      if (!subJob) {
        res.status(404).json({
          message: `Error: Failed to find sub-job with ID: ${subJobId}`,
        });
        return;
      }

      // Delete all child cushions
      if (subJob.cushionList.length > 0) {
        const cushions = await Promise.all(
          subJob.cushionList.map(async (cushionId) => {
            const cushion = await schemas.Cushion.findByIdAndDelete(cushionId);
            return cushion;
          })
        );
        if (!cushions) {
          res
            .status(404)
            .json({ message: "Error: Failed to delete child cushions." });
        }
      }
      // Delete all child frames
      if (subJob.frameList.length > 0) {
        const frames = await Promise.all(
          subJob.frameList.map(async (frameId) => {
            const frame = await schemas.Frame.findByIdAndDelete(frameId);
            return frame;
          })
        );
        if (!frames) {
          res
            .status(404)
            .json({ message: "Error: Failed to delete child frames." });
        }
      }
      // Delete all child upholstery
      if (subJob.upholsteryList.length > 0) {
        const upholstery = await Promise.all(
          subJob.upholsteryList.map(async (upholsteryId) => {
            const upholstery = await schemas.Upholstery.findByIdAndDelete(
              upholsteryId
            );
            return upholstery;
          })
        );
        if (!upholstery) {
          res
            .status(404)
            .json({ message: "Error: Failed to delete child upholstery." });
        }
      }
    }
    // Delete all child subJobs
    if (job.subJobList.length > 0) {
      const subJobs = await Promise.all(
        job.subJobList.map(async (subJobId) => {
          const subJob = await schemas.SubJob.findByIdAndDelete(subJobId);
          return subJob;
        })
      );
      if (!subJobs) {
        res
          .status(404)
          .json({ message: "Error: Failed to delete child subJobs." });
      }
    }
    // -------------------------------------------------------------
    // Finally, delete the job
    const result = await schemas.Job.findByIdAndDelete<Job>(id);
    if (!result) {
      res.status(404).json({
        message: `Error: Failed to find job with ID: ${id}! Or could not process request.`,
      });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const multiFilterSearch = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      searchTerm,
      invoiceIdTerm,
      jobNameTerm,
      clientTerm,
      dueDateTerm,
      archiveTerm,
      yearTerm,

      cutTerm,
      sewnTerm,
      upholsterTerm,
      foamedTerm,
      completeTerm,
      productionTerm
    }: RequestProps = req.body;

    var filteredJobs: Job[] = [];
    
    // get unpinned and non-null due jobs
    const jobsUnpinnedWithDue = await schemas.Job.find<Job>({
      isArchived: { $in: false },
      isPinned: { $in: false },
      due: { $eq: null }
    }).sort({ due: "ascending" });
    if (!jobsUnpinnedWithDue) {
      res.status(404).json({ message: "Error: Failed to retrieve unpinned non-null due jobs." });
      return;
    }

    // get unpinned and null due jobs
    const jobsUnpinnedNullDue = await schemas.Job.find<Job>({
      isArchived: { $in: false },
      isPinned: { $in: false },
      due: { $ne: null }
    }).sort({ due: "ascending" });
    if (!jobsUnpinnedNullDue) {
      res.status(404).json({ message: "Error: Failed to retrieve unpinned null due jobs." });
      return;
    }

    // get pinned jobs
    const pinnedJobs = await schemas.Job
      .find<Job>({ isPinned: { $in: true } })
      .sort({ due: "ascending" });
    if (!pinnedJobs) {
      res.status(404).json({ message: "Error: Failed to retrieve pinned jobs." });
      return;
    }

    // organise jobs
    filteredJobs = [...pinnedJobs, ...jobsUnpinnedNullDue, ...jobsUnpinnedWithDue];

    //---ARCHIVE FILTER---//

    if (archiveTerm === "true") {
      filteredJobs = await schemas.Job.find<Job>({ isArchived: true }).sort({ due: "ascending" });
    }

    //---END ARCHIVE FILTER---//

    //---SEARCH FILTER---//

    filteredJobs = filteredJobs.filter((job: Job) => {
      if (job.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    });

    //---END SEARCH FILTER---//

    //---YEAR FILTER---//

    if (yearTerm !== "--") {
      filteredJobs = filteredJobs.filter((job: Job) => {
        const year = String(job.due).substring(11, 15);
        if (year === yearTerm) return true;
      });
    }

    //---END YEAR FILTER---//


    //---ASC/DSC FILTER---//

    if (invoiceIdTerm) {
      filteredJobs.sort((a, b) => {
        const invoiceIdA = a.invoiceId?.toLowerCase() || "";
        const invoiceIdB = b.invoiceId?.toLowerCase() || "";
        if (invoiceIdTerm === "ascending") {
          return invoiceIdA.localeCompare(invoiceIdB);
        }
        return invoiceIdB.localeCompare(invoiceIdA);
      });
    }
    else if (jobNameTerm) {
      filteredJobs.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (jobNameTerm === "ascending") {
          return nameA.localeCompare(nameB);
        }
        return nameB.localeCompare(nameA);
      });
    }
    else if (clientTerm) {
      filteredJobs.sort((a, b) => {
        const clientA = a.client.toLowerCase();
        const clientB = b.client.toLowerCase();
        if (clientTerm === "ascending") {
          return clientA.localeCompare(clientB);
        }
        return clientB.localeCompare(clientA);
      });
    }
    else if (dueDateTerm) {
      filteredJobs.sort((a, b) => {
        const dueDateA = String(a.due).toLowerCase();
        const dueDateB = String(b.due).toLowerCase();
        if (dueDateTerm === "ascending") {
          return dueDateA.localeCompare(dueDateB);
        }
        return dueDateB.localeCompare(dueDateA);
      });
    }

    //---END ASC/DSC FILTER---//



    //---STATUS FILTER---//

    const subJobs = await schemas.SubJob.find<SubJob>({});
    const frames = await schemas.Frame.find<Frame>({});
    const cushions = await schemas.Cushion.find<Cushion>({});
    const upholstery = await schemas.Upholstery.find<Upholstery>({});
    
    const statusJobSet = new Set<Job>();
    if (cutTerm === "true") {
      const cutJobSet = new Set<Job>();
      const cutSubJobSet = new Set<SubJob>();
      const cutCushions: Cushion[] = cushions.filter((cushion: Cushion) => {
        if (cushion.status === "Upholstery Cut") return true;
      });
      cutCushions.map((cushion: Cushion) => {
        const cutSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id == cushion.subJobId
        );
        if (cutSubJob) cutSubJobSet.add(cutSubJob);
      });
      if (cutSubJobSet.size > 0) {
        const cutSubJobArray = [...cutSubJobSet];
        cutSubJobArray.map((subJob: SubJob) => {
          const cutJob = filteredJobs.find((job: Job) => job._id == subJob.jobId);
          if (cutJob) cutJobSet.add(cutJob);
        });
        if (cutJobSet.size > 0) {
          const cutJobArray = [...cutJobSet];
          cutJobArray.map((job: Job) => {
            statusJobSet.add(job);
          });
        }
      }
      else {
        filteredJobs = [];
      }
    }
    if (upholsterTerm === "true") {
      const upholsterJobSet = new Set<Job>();
      const upholsterSubJobSet = new Set<SubJob>();
 
      const upholsterUpholstery: Upholstery[] = upholstery.filter(
        (upholster: Upholstery) => {
          if (upholster.status === "Body Upholstered") return true;
        }
      );
      upholsterUpholstery.map((upholster: Upholstery) => {
        const upholsterSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id == upholster.subJobId
        );
        if (upholsterSubJob) upholsterSubJobSet.add(upholsterSubJob);
      });
      const upholsterCushions: Cushion[] = cushions.filter(
        (cushion: Cushion) => {
          if (cushion.status === "Body Upholstered") return true;
        }
      );
      upholsterCushions.map((cushion: Cushion) => {
        const upholsterSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id == cushion.subJobId
        );
        if (upholsterSubJob) upholsterSubJobSet.add(upholsterSubJob);
      });
 
      if (upholsterSubJobSet.size > 0) {
        const upholsterSubJobArray = [...upholsterSubJobSet];
        upholsterSubJobArray.map((subJob: SubJob) => {
          const upholsterJob = filteredJobs.find(
            (job: Job) => job._id == subJob.jobId
          );
          if (upholsterJob) upholsterJobSet.add(upholsterJob);
        });
        if (upholsterJobSet.size > 0) {
          const upholsterJobArray = [...upholsterJobSet];
          upholsterJobArray.map((job: Job) => {
            statusJobSet.add(job);
          });
        }
      }
      else {
        filteredJobs = [];
      }
    }
    if (sewnTerm === "true") {
      const sewnJobSet = new Set<Job>();
      const sewnSubJobSet = new Set<SubJob>();
 
      const sewnCushions: Cushion[] = cushions.filter((cushion: Cushion) => {
        if (cushion.status === "Upholstery Sewn") return true;
      });
      sewnCushions.map((cushion: Cushion) => {
        const sewnSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id == cushion.subJobId
        );
        if (sewnSubJob) sewnSubJobSet.add(sewnSubJob);
      });
      if (sewnSubJobSet.size > 0) {
        const sewnSubJobArray = [...sewnSubJobSet];
        sewnSubJobArray.map((subJob: SubJob) => {
          const sewnJob = filteredJobs.find((job: Job) => job._id == subJob.jobId);
          if (sewnJob) sewnJobSet.add(sewnJob);
        });
        if (sewnJobSet.size > 0) {
          const sewnJobArray = [...sewnJobSet];
          sewnJobArray.map((job: Job) => {
            statusJobSet.add(job);
          });
        }
      }
      else {
        filteredJobs = [];
      }
    }
    if (foamedTerm === "true") {
      const foamedJobSet = new Set<Job>();
      const foamedSubJobSet = new Set<SubJob>();
 
      const foamedFrames: Frame[] = frames.filter((frame: Frame) => {
        if (frame.status === "Frame Foamed") return true;
      });
      foamedFrames.map((frame: Frame) => {
        const foamedSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id == frame.subJobId
        );
        if (foamedSubJob) foamedSubJobSet.add(foamedSubJob);
      });
      if (foamedSubJobSet.size > 0) {
        const foamedSubJobArray = [...foamedSubJobSet];
        foamedSubJobArray.map((subJob: SubJob) => {
          const foamedJob = filteredJobs.find((job: Job) => job._id == subJob.jobId);
          if (foamedJob) foamedJobSet.add(foamedJob);
        });
        if (foamedJobSet.size > 0) {
          const foamedJobArray = [...foamedJobSet];
          foamedJobArray.map((job: Job) => {
            statusJobSet.add(job);
          });
        }
      }
      else {
        filteredJobs = [];
      }
    }
    if (completeTerm === "true") {
      const completeJobSet = new Set<Job>();
      const completeSubJobSet = new Set<SubJob>();
 
      const completeFrames: Frame[] = frames.filter((frame: Frame) => {
        if (frame.status === "Complete") return true;
      });
      completeFrames.map((frame: Frame) => {
        const completeSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id == frame.subJobId
        );
        if (completeSubJob) completeSubJobSet.add(completeSubJob);
      });
 
      const completeCushions: Cushion[] = cushions.filter(
        (cushion: Cushion) => {
          if (cushion.status === "Complete") return true;
        }
      );
      completeCushions.map((cushion: Cushion) => {
        const completeSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id == cushion.subJobId
        );
        if (completeSubJob) completeSubJobSet.add(completeSubJob);
      });
 
      const completeUpholstery: Upholstery[] = upholstery.filter(
        (upholster: Upholstery) => {
          if (upholster.status === "Complete") return true;
        }
      );
      completeUpholstery.map((upholster: Upholstery) => {
        const completeSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id == upholster.subJobId
        );
        if (completeSubJob) completeSubJobSet.add(completeSubJob);
      });
 
      if (completeSubJobSet.size > 0) {
        const completeSubJobArray = [...completeSubJobSet];
        completeSubJobArray.map((subJob: SubJob) => {
          const completeJob = filteredJobs.find((job: Job) => job._id == subJob.jobId);
          if (completeJob) completeJobSet.add(completeJob);
        });
        if (completeJobSet.size > 0) {
          const completeJobArray = [...completeJobSet];
          completeJobArray.map((job: Job) => {
            statusJobSet.add(job);
          });
        }
      }
      else {
        filteredJobs = [];
      }
    }
    if (productionTerm === "true") {
      const productionJobSet = new Set<Job>();
      const productionSubJobSet = new Set<SubJob>();
 
      const productionFrames: Frame[] = frames.filter((frame: Frame) => {
        if (frame.status === "In Production") return true;
      });
      productionFrames.map((frame: Frame) => {
        const productionSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id == frame.subJobId
        );
        if (productionSubJob) productionSubJobSet.add(productionSubJob);
      });
 
      const productionCushions: Cushion[] = cushions.filter(
        (cushion: Cushion) => {
          if (cushion.status === "In Production") return true;
        }
      );
      productionCushions.map((cushion: Cushion) => {
        const productionSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id == cushion.subJobId
        );
        if (productionSubJob) productionSubJobSet.add(productionSubJob);
      });
 
      const productionUpholstery: Upholstery[] = upholstery.filter(
        (upholster: Upholstery) => {
          if (upholster.status === "In Production") return true;
        }
      );
      productionUpholstery.map((upholster: Upholstery) => {
        const productionSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id == upholster.subJobId
        );
        if (productionSubJob) productionSubJobSet.add(productionSubJob);
      });
 
      if (productionSubJobSet.size > 0) {
        const productionSubJobArray = [...productionSubJobSet];
        productionSubJobArray.map((subJob: SubJob) => {
          const productionJob = filteredJobs.find(
            (job: Job) => job._id == subJob.jobId
          );
          if (productionJob) productionJobSet.add(productionJob);
        });
        if (productionJobSet.size > 0) {
          const productionJobArray = [...productionJobSet];
          productionJobArray.map((job: Job) => {
            statusJobSet.add(job);
          });
        }
      }
      else {
        filteredJobs = [];
      }
    }
    if (statusJobSet.size > 0) {
      filteredJobs = [...statusJobSet];
    }

    //---END STATUS FILTER---//

    res.status(200).json(filteredJobs);
  }
  catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
}

