import { RESTRICTED_WORDS } from "@/constants/posts";

/**
 * 텍스트에 금칙어가 포함되어 있는지 확인
 * @param text 검사할 텍스트
 * @returns 금칙어가 포함되어 있으면 true
 */
export const containsRestrictedWords = (text: string): boolean => {
  return RESTRICTED_WORDS.some((word: string) => text.includes(word));
};

/**
 * 금칙어가 포함된 경우 에러 메시지 반환
 * @param text 검사할 텍스트
 * @returns 금칙어가 포함되어 있으면 에러 메시지, 없으면 null
 */
export const validateRestrictedWords = (text: string): string | null => {
  if (containsRestrictedWords(text)) {
    return `금지된 단어가 포함되어 있습니다. ${RESTRICTED_WORDS.join(
      ", "
    )} 를 확인해주세요.`;
  }
  return null;
};

/**
 * 금칙어 목록 반환
 */
export const getRestrictedWords = (): readonly string[] => {
  return RESTRICTED_WORDS;
};
