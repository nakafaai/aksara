import { QuestionBodyKindSchema } from "@nakafa/aksara-contracts/question/identity";
import { Schema } from "effect";

const PATH_SEPARATOR = /[\\/]/u;
const MDX_SUFFIX = /\.mdx$/u;

/** The authored contract that controls which checks inspect one document. */
export type DocumentProfile = "article" | "lesson" | "question" | "answer";

/** Reads the contract-owned question body role from a locale-qualified file. */
function questionBodyKind(file: string): "question" | "answer" | undefined {
  const stem = file
    .split(PATH_SEPARATOR)
    .slice(-1)
    .join("")
    .replace(MDX_SUFFIX, "");
  const kind = stem.slice(0, stem.lastIndexOf("."));
  return Schema.is(QuestionBodyKindSchema)(kind) ? kind : undefined;
}

/**
 * Derives one stable content profile from the source path and question body
 * contract. Articles use journal checks, lessons and answers use teaching
 * checks, and assessed prompts keep their source wording untouched.
 */
export function documentProfile(file: string): DocumentProfile {
  const questionKind = questionBodyKind(file);
  if (questionKind) {
    return questionKind;
  }
  return file.split(PATH_SEPARATOR).includes("articles") ? "article" : "lesson";
}
