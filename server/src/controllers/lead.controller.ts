import { Request, Response } from 'express';
import Lead from '../models/lead.model';

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || '';

    const status = req.query.status || '';

    const source = req.query.source || '';

    const sort =
      req.query.sort === 'oldest'
        ? 1
        : -1;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          email: {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: sort })
      .skip(skip)
      .limit(limit);

    const total =
      await Lead.countDocuments(query);

    res.status(200).json({
      data: leads,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    await Lead.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: 'Lead deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
};