import { merdekaClassNodes } from "#corpus/curriculum/merdeka/classes";
import { defineCurriculum } from "#corpus/curriculum/schema";
import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

export const merdekaCurriculum = defineCurriculum({
  programKey: LEARNING_PROGRAM_KEYS.merdeka,
  tree: merdekaClassNodes,
});
