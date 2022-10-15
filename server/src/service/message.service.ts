import { User } from "@prisma/client";
import { TMessage } from "../schema/message.schema";
import { omitFromMessage } from "../utils/prismaOmit";

/**
 * @description function to create a message
 */
export const createMessageForUser = async (
  currentUser: User | undefined,
  messageText: TMessage["body"]
) => {
  if (!currentUser) {
    return {
      message: null,
      error: "No jwt token; couldn't create message",
    };
  } else {
    const { id } = currentUser;

    try {
      const message = await prisma.message.create({
        data: {
          text: messageText.text,
          userId: id,
        },
      });
      return {
        message,
        error: null,
      };
    } catch (error) {
      return {
        message: null,
        error: "Prisma error; couldn't create message",
      };
    }
  }
};

/**
 * @description function that gets the message
 */
export const getMessagesForUser = async (currentUser: User | undefined) => {
  try {
    if (!currentUser || currentUser.role === "USER") {
      const messages = await prisma.message.findMany({}); // NOTE thi could be empty
      return {
        messages: messages.map((message) => omitFromMessage(message, "userId")),
        error: null,
      };
    } else {
      const messages = await prisma.message.findMany({
        include: {
          user: {
            select: {
              id: true,
              userName: true,
            },
          },
        },
      });
      return { messages, error: null };
    }
  } catch (error) {
    return {
      messages: null,
      error: "Prisma error; couldn't get messages",
    };
  }
};

/**
 * @description function to get a single message
 */
export const getMessageForUser = async (
  currentUser: User | undefined,
  messageId: string
) => {
  const message = await prisma.message.findUnique({
    where: {
      id: messageId,
    },
  });
  return !message
    ? {
        error: "No message found",
        message: null,
      }
    : !currentUser || currentUser.role === "USER"
    ? {
        message: omitFromMessage(message, "userId"),
        error: null,
      }
    : {
        message,
        error: null,
      };
};

/**
 * @description function to update a message
 */
export const updateMessageForUser = async (
  currentUser: User | undefined,
  messageId: string,
  updatedText: TMessage["body"]
) => {
  if (currentUser) {
    const { id } = currentUser;
    try {
      await prisma.message.updateMany({
        where: {
          AND: [
            {
              id: messageId,
            },
            {
              userId: id,
            },
          ],
        },
        data: {
          text: updatedText.text,
        },
      });
      return {
        message: "Updated message",
        error: null,
      };
    } catch (_error) {
      return {
        message: "",
        error: "Prisma error; couldn't update message",
      };
    }
  } else {
    return {
      message: null,
      error: "User error; couldn't update message",
    };
  }
};

/**
 * @description function to delete a message
 */
export const deleteMessageForUser = async (
  currentUser: User | undefined,
  messageId: string
) => {
  if (currentUser) {
    const { id, role } = currentUser;
    try {
      role === "ADMIN"
        ? await prisma.message.delete({
            where: { id: messageId },
          })
        : await prisma.message.deleteMany({
            where: { AND: [{ id: messageId }, { userId: id }] },
          });
      return {
        message: "Deleted message",
        error: null,
      };
    } catch (error) {
      return {
        message: null,
        error: "Prisma error; couldn't delete message",
      };
    }
  } else {
    return {
      message: null,
      error: "Auth error; couldn't delete message",
    };
  }
};
