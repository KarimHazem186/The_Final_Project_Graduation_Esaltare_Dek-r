const vendor = await Vendor.findById(req.user._id); // or vendorId from token

if (vendor.approvalStatus !== "approved") {
  return res.status(403).json({ message: "Your account is not approved by admin." });
}
