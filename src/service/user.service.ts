import { User } from "@prisma/client";
import { TUpdateSchema } from "../schema/user.schema";
import prisma from "../config/prisma";
import env from "../config/env";
import bcrypt from "bcryptjs";
import { omitFromUser } from "../utils/prismaOmit";

/**
 * @description function to update user
 */
export const updateUserForUser = async (
  currentUser: User | undefined,
  updateUserId: string,
  updatedUserBody: TUpdateSchema["body"]
) => {
  if (!currentUser) {
    return {
      user: null,
      error: "Auth error; user isn't logged in",
    };
  } else {
    if (updateUserId === currentUser.id) {
      try {
        const salt = await bcrypt.genSalt(env.SALTWORKFACTOR);
        const hashedPassword = bcrypt.hashSync(updatedUserBody.password, salt);

        const updatedUser = await prisma.user.update({
          where: {
            id: currentUser.id,
          },
          data: {
            name: updatedUserBody.name,
            userName: updatedUserBody.userName,
            email: updatedUserBody.email,
            password: hashedPassword,
          },
        });

        return {
          user: omitFromUser(updatedUser, "password"),
          error: null,
        };
      } catch (error) {
        return {
          user: null,
          error: `Prisma or bcryptjs error:${error} `,
        };
      }
    } else {
      return {
        user: null,
        error: "Auth error: can't update another user",
      };
    }
  }
};

/**
 * @description function to delete user
 */
export const deleteUserForUser = async (
  currentUser: User | undefined,
  deleteUserId: string
) => {
  if (!currentUser) {
    return {
      message: null,
      error: "Auth error: no user",
    };
  } else {
    if (currentUser.id === deleteUserId || currentUser.role === "ADMIN") {
      try {
        await prisma.user.delete({
          where: {
            id: deleteUserId,
          },
        });
        return {
          message: `Deleted user: ${deleteUserId}`,
          error: null,
        };
      } catch (error) {
        return {
          message: null,
          error: "Error; couldn't delete user",
        };
      }
    } else {
      return {
        message: null,
        error: "Auth error; can only delete your own account or must be ADMIN",
      };
    }
  }
};
