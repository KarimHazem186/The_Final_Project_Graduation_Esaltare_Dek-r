// adminController.js
const Vendor = require("../models/vendorModel");

exports.updateVendorApproval = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // status = "approved" | "rejected"

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid approval status." });
  }

  const vendor = await Vendor.findByIdAndUpdate(
    id,
    { approvalStatus: status },
    { new: true }
  );

  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found." });
  }

  res.status(200).json({ message: `Vendor ${status}`, vendor });
};


/*
const Vendor = require("../models/vendorModel");

// Get list of all vendors (for admin panel)
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("products").select("-password");
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vendors", error });
  }
};

// Approve or reject a vendor
exports.updateVendorApproval = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status. Must be 'approved' or 'rejected'." });
  }

  try {
    const vendor = await Vendor.findByIdAndUpdate(
      id,
      { approvalStatus: status },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: `Vendor ${status}`, vendor });
  } catch (error) {
    res.status(500).json({ message: "Approval update failed", error });
  }
};

*/



/*

await axios.patch(`/api/admin/vendors/${vendorId}/approval`, {
  status: "approved",
}, {
  headers: { Authorization: `Bearer ${adminToken}` }
});

*/