export const extractOutputFolder = (message) => {
  return message.split("/").pop();
};
