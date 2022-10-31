import { User } from "@prisma/client";
import { TMessage } from "../schema/message.schema";
import { omitFromMessage } from "../utils/prismaOmit";
import prisma from "../config/prisma";

/**
 * @description function to create a message
 * @param currentUser: the current user
 */
export const createMessageService = async (
  currentUser: User,
  messageText: TMessage["body"]
) => {
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
};

/**
 * @description function that gets the message
 */
export const getMessagesService = async (currentUser: User | undefined) => {
  try {
    if (!currentUser || currentUser.role === "USER") {
      const messages = await prisma.message.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
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
        orderBy: { createdAt: "desc" },
      });
      return { messages, error: null };
    }
  } catch (error) {
    return {
      messages: null,
      error: "Couldn't get messages",
    };
  }
};

/**
 * @description function to get a single message
 */
export const getMessageService = async (
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
 * @param currentUser only available to logged in usess
 */
export const updateMessageService = async (
  currentUser: User,
  messageId: string,
  updatedText: TMessage["body"]
) => {
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
      message: null,
      error: "Prisma error; couldn't update message",
    };
  }
};

/**
 * @description function to delete a message
 */
export const deleteMessageService = async (
  currentUser: User,
  messageId: string
) => {
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
};
