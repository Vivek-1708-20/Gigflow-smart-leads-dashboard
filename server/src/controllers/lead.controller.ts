import Lead from "../models/lead.model";

export const createLead = async (req: any, res: any) => {
  try {
    console.log(req.body);

    const lead = await Lead.create({
      name: req.body.name,
      email: req.body.email,
      status: req.body.status || "New",
      source: req.body.source || "Website",
    });

    res.status(201).json(lead);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};