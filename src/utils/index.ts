export const sleep = async (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

/**
 * Generate random name, with selected length characters. Default length is 12.
 * @param length Length of random string.
 * @returns Randomized name.
 */
export const generateRandomName = (length: number = 12): string => {
  const vocabulary = 'ABCDEFGHIJKLMNOUPRSTUWZabcdefghijklmnouprstuwz';
  let name = '';
  for (let x = 0; x < length; x++) {
    name += vocabulary[Math.floor(Math.random() * vocabulary.length)];
  }
  return name;
};

/**
 * Generate random number. Default size = 100.
 * @param size Length of random string.
 * @returns Randomized name.
 */
export const generateRandomNumber = (size: number = 100): number => {
  return Math.floor(Math.random() * size);
};

generateRandomNumber;
