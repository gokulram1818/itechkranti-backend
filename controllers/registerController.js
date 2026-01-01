import Registration from "../models/Registration.js";
import getNextId from "../utils/getNextId.js";
import Counter from "../models/Counter.js";

export const registerUser = async (req, res) => {
  try {
    const {
      participant1Name,
      participant1Roll,
      participant2Name,
      participant2Roll,
      stream,
      department,
      phone,
      events,
    } = req.body;

    if (
      !participant1Name ||
      !participant1Roll ||
      !department ||
      !phone ||
      !stream ||
      !participant2Name ||
      !participant2Roll
    ) {
      return res.status(400).json({ message: "Required fields missing" });
    }


    
    const regId = await getNextId("registration");

    const eventLimits = {
      promptMasters: 50,
      codeRelay: 50,
    };

    for (const event in eventLimits) {
      if (events[event]) {
        const counter = await Counter.findById(event);

        if (!counter) {
          return res
            .status(500)
            .json({ message: `${event} counter not initialized` });
        }

        if (counter.seq >= eventLimits[event]) {
          return res.status(400).json({
            message:
              event === "promptMasters"
                ? "Prompt Masters registrations are full"
                : "Code Relay registrations are full",
          });
        }

        counter.seq += 1;
        await counter.save();
      }
    }

    const regId = await getNextId("registration");

    const registration = await Registration.create({
      regId,
      participant1Name,
      participant1Roll,
      participant2Name,
      participant2Roll,
      stream,
      department,
      phone,
      events,
    });

    res.status(201).json({
      message: "Registration successful",
      data: registration,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
