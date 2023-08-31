import mongoose from "mongoose";
import Inc from "mongoose-sequence";
import { useVirtualId } from "../DB/db.js";

const AutoIncrement = Inc(mongoose);

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      require: true,
    },
    nickname: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: false }
);

userSchema.plugin(AutoIncrement, { id: "userId", inc_field: "userId" });

useVirtualId(userSchema);
const User = mongoose.model("userModel", userSchema);

export async function findByUsername(nickname) {
  return User.findOne({ nickname });
}

export async function findById(userId) {
  return User.find({ userId });
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

export async function getAll() {
  return User.find().sort({ createdAt: -1 });
}
