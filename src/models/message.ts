import { Types, Schema, model } from "mongoose";
import { DateTime } from "luxon";

interface IMessage {
  title: string;
  body: string;
  user: string | Types.ObjectId;
  timestamp: Date;
  timestamp_formatted?: Date
  url?: string;
}

const MessageSchema = new Schema<IMessage>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  timestamp: { type: Date, required: true },
});

MessageSchema.virtual("url").get(function () {
  return "/item/" + this._id;
});

MessageSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});

const Message = model<IMessage>("Message", MessageSchema);
export { IMessage };
export default Message;
