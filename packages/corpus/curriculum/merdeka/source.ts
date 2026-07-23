import { merdekaClassNodes } from "#corpus/curriculum/merdeka/classes";
import { defineCurriculum } from "#corpus/curriculum/schema";
import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

/** Lazily validates the complete authored Merdeka curriculum tree. */
export const merdekaCurriculum = defineCurriculum({
  programKey: LEARNING_PROGRAM_KEYS.merdeka,
  tree: merdekaClassNodes,
});
