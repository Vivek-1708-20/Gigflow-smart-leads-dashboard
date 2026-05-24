import Lead from "../models/lead.model";

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

export const createLead = async (
  req: any,
  res: any
) => {
  try {
    console.log(req.body);
   console.log(Error);
    const lead = new Lead({
      name: req.body.name || "Unknown",
      email: req.body.email || "test@gmail.com",
      status: req.body.status || "New",
      source: req.body.source || "Website",
    });

    const savedLead = await lead.save();

    res.status(201).json(savedLead);
  } catch (error: any) {
    console.log("CREATE LEAD ERROR:", error);

    res.status(500).json({
      message: error.message,
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