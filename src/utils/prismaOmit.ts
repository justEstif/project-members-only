/**
 * @description function for omiting field(s) from user
 */
export function omitFromUser<User, Key extends keyof User>(
  user: User,
  ...keys: Key[]
): Omit<User, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}

/**
 * @description function for omiting field(s) from message
 */
export function omitFromMessage<Message, Key extends keyof Message>(
  message: Message,
  ...keys: Key[]
): Omit<Message, Key> {
  for (const key of keys) {
    delete message[key];
  }
  return message;
}
