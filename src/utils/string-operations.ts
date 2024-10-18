import { QUOTES, QUOTESREGEX } from "../common/constants";

const cleanDoubleQuotes = (char: string): string => char.replace(QUOTESREGEX, QUOTES);

export default cleanDoubleQuotes;
