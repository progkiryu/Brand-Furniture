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
    }).sort({ due: "descending" }); // Sort latest first;
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

export const getArchivedJobs = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const archivedJobs = await schemas.Job.find({
      isArchived: { $in: true },
    }).sort({ due: "descending" }); // Sort latest first
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

export const getFilteredJobsByDate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const startDate: String = req.body.startDate;
    const endDate: String = req.body.endDate;
    if (!startDate || !endDate) {
      res.status(404).json({ message: "Error: Failed to provide date range." });
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
      res.status(404).json({ message: "Error: Failed to provide job type." });
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
      const mainJobId = subJob.jobId.toString();

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
