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
