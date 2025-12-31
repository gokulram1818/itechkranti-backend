import mongoose from "mongoose";


const registrationSchema = new mongoose.Schema(
    {
    regId: {
      type: Number,
      unique: true,
    },
  
    participant1Name: { type: String, required: true },
    participant1Roll: { type: String, required: true },

    participant2Name: { type: String, required: true },
    participant2Roll: { type: String, required: true  },
    stream: {type: String, required:true},

    department: { type: String, required: true },
    phone: { type: String, required: true },

    events: {
        cipherChase: { type: Boolean, default: false },
        codeRelay: { type: Boolean, default: false },
        promptMasters: { type: Boolean, default: false },
        memeMania: { type: Boolean, default: false },
        mindscape: { type: Boolean, default: false },
        techSpirit: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Registration", registrationSchema);
