import { Types, Schema, model } from "mongoose"
import { DateTime } from "luxon"

interface IMessage {
  title: string
  body: string
  user: string | Types.ObjectId
  timestamp: Date
  timestampFormatted?: Date
  url?: string
}

const MessageSchema = new Schema<IMessage>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  timestamp: { type: Date, default: Date.now },
})

MessageSchema.virtual("url").get(function () {
  const message = this
  return "/message/" + message._id
})

MessageSchema.virtual("timestampFormatted").get(function () {
  const message = this
  return DateTime.fromJSDate(message.timestamp).toLocaleString(DateTime.DATE_MED)
})

const Message = model<IMessage>("Message", MessageSchema)
export { IMessage }
export default Message
