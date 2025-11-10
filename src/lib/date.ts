import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

/**
 * 날짜 포맷팅 유틸리티
 */
export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("YYYY년 M월 D일 HH:mm");
};

