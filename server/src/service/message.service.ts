import { User } from "@prisma/client";
import { omitFromMessage } from "../utils/prismaOmit";

/**
 * @description function that gets the message
 */
export const getMessagesForUser = async (currentUser: User | undefined) => {
  if (!currentUser) {
    const messages = await prisma.message.findMany({});
    return {
      messages: messages.map((message) => omitFromMessage(message, "userId")),
      error: null,
    };
  } else {
    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });
    if (user) {
      if (user.role === "USER") {
        const messages = await prisma.message.findMany({});
        return {
          messages: messages.map((message) =>
            omitFromMessage(message, "userId")
          ),
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
    } else {
      return {
        messages: null,
        error: "User not found",
      };
    }
  }
};

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
