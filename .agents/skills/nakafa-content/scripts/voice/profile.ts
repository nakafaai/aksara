import { Schema } from "effect";

/**
 * The role of one question-bank document: an assessed prompt, a shared
 * reading, or an explanation. Prompts and readings keep their source wording.
 */
const BodyKindSchema = Schema.Literals(["answer", "question", "stimulus"]);
export type BodyKind = typeof BodyKindSchema.Type;

const PATH_SEPARATOR = /[\\/]/u;
const MDX_SUFFIX = /\.mdx$/u;

/** The authored contract that controls which checks inspect one document. */
type DocumentProfile = "article" | "lesson" | "question" | "answer";

/** Reads the question-bank role of a locale-qualified file. */
function questionBodyKind(file: string): "question" | "answer" | undefined {
  const stem = file
    .split(PATH_SEPARATOR)
    .slice(-1)
    .join("")
    .replace(MDX_SUFFIX, "");
  const kind = stem.slice(0, stem.lastIndexOf("."));
  if (!Schema.is(BodyKindSchema)(kind)) {
    return;
  }
  return kind === "answer" ? "answer" : "question";
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
