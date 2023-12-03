import { authModel } from "../models/auth.model.js";
import { recordModel } from "../models/record.model.js";
import { testModel } from "../models/test.model.js";

export const recordResponses = async (req, res) => {
  try {
    // getting the user id from request
    const userId = req.userId;
    if (!userId) {
      const err = new Error("Invalid user");
      throw err;
    }

    // finding user in the database
    const user = await authModel.findOne({ _id: userId });
    if (!user) {
      const err = new Error("User not found");
      throw err;
    }

    // getting test name from url
    const testNameFromUrl = req.params.testName;

    // getting the data
    const { testName, solutions } = req.body;
    if (!testName || solutions.length === 0 || testName != testNameFromUrl) {
      const err = new Error("Invalid test name provided");
      throw err;
    }

    // finding the test in database
    const test = await testModel.find({ testName });
    if (!test) {
      const err = new Error("No such test found");
      throw err;
    }

    // saving the record
    const saveRecord = new recordModel({
      userId,
      testName,
      solutions,
    });
    await saveRecord.save();

    res.json({ success: true, message: "Records added successfully." });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
