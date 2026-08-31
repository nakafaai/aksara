import { QUESTION_BANK_KEY_ROOT } from "@nakafa/aksara-contracts/question/identity";

import { indonesiaTryoutCountry } from "#corpus/tryout/indonesia/country";

/** Stable TKA exam identity and authored question-bank root. */
export const TKA_EXAM_KEY = "tka";
export const TKA_QUESTION_ROOT = `${QUESTION_BANK_KEY_ROOT}/${indonesiaTryoutCountry.countryKey}/${TKA_EXAM_KEY}`;
