import { User } from "@prisma/client";
import { TUpdateSchema } from "../schema/user.schema";
import prisma from "../config/prisma";
import env from "../config/env";
import bcrypt from "bcryptjs";
import { omitFromUser } from "../utils/prismaOmit";

/**
 * @description function to update user
 */
export const updateUserService = async (
  currentUser: User,
  updateUserId: string,
  updatedUserBody: TUpdateSchema["body"]
) => {
  const getHashedPw = async (input: string) => {
    const salt = await bcrypt.genSalt(env.SALTWORKFACTOR);
    return bcrypt.hashSync(input, salt);
  };
  if (updateUserId === currentUser.id) {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          ...(updatedUserBody.name && {
            name: updatedUserBody.name,
          }),

          ...(updatedUserBody.userName && {
            userName: updatedUserBody.userName,
          }),

          ...(updatedUserBody.email && {
            email: updatedUserBody.email,
          }),

          ...(updatedUserBody.password && {
            password: await getHashedPw(updatedUserBody.password),
          }),

          ...(updatedUserBody.secretKey &&
            updatedUserBody.secretKey === env.MEMBER_KEY && {
              role: "MEMBER",
            }),

          ...(updatedUserBody.secretKey &&
            updatedUserBody.secretKey === env.ADMIN_KEY && {
              role: "ADMIN",
            }),
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
};

/**
 * @description function to delete user
 */
export const deleteUserService = async (
  currentUser: User,
  deleteUserId: string
) => {
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
};
