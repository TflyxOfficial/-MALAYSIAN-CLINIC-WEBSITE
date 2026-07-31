// Manual word-splitting helper (SplitText plugin requires a Club GreenSock
// license, so headline reveal is implemented with a hand-rolled span-per-word
// split instead).
export function splitWords(text: string): string[] {
  return text.split(" ");
}
