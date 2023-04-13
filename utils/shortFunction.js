const BaseChar =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const MAX = 61;
const MIN = 0;

/**
 * 依照輸入的短網址長度，產生對應的亂數字串 // WHY? JSDoc語法
 * @param {number} shortURL_Length
 */

module.exports = (shortURL_Length) => {
  let result = "";
  for (let i = 0; i < shortURL_Length; i++) {
    const randomIndex = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
    const chooseChar = BaseChar[randomIndex];
    result += chooseChar;
  }
  return result;
};
