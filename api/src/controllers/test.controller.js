export const testController = async (req, res) => {
  try {
    res.json({ success: true, message: "Test successful" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
