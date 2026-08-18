import type { ProgramLocaleSourceInput } from "#corpus/program/locale";
import { germanProgramLocaleSources } from "#corpus/program/locale/de";

/** Permanent locale-owned learning-program copy, independent of activation. */
export const programLocaleSources: readonly ProgramLocaleSourceInput[] =
  germanProgramLocaleSources;
