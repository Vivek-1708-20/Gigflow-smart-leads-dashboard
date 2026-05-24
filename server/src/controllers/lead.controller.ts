import Lead from "../models/Lead";

export const getLeads = async (req: any, res: any) => {
  try {
    const leads = await Lead.find();

    res.json(leads);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const createLead = async (req: any, res: any) => {
  try {
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
    });
  }
};

export const updateLead = async (req: any, res: any) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteLead = async (req: any, res: any) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      message: "Lead deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};