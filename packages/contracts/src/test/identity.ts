/** Expected parts of the golden try-out question-set key. */
export const setParts = {
  countryKey: "test-country",
  examKey: "test-exam",
  intermediateBankKeys: [],
  sectionKey: "test-section-2",
  setKey: "test-set",
};

/** Expected parts of the golden try-out question key. */
export const questionParts = {
  countryKey: "test-country",
  examKey: "test-exam",
  intermediateBankKeys: [],
  questionNumber: 1,
  questionSetKey:
    "question-bank/tryout/test-country/test-exam/test-section-2/test-set",
  sectionKey: "test-section-2",
  setKey: "test-set",
};

/** Expected parts of the golden item source path. */
export const itemSourceParts = {
  countryKey: "test-country",
  examKey: "test-exam",
  intermediateBankKeys: [],
  kind: "item",
  questionKey:
    "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1",
  questionNumber: 1,
  sectionKey: "test-section-2",
  setKey: "test-set",
  sourcePath:
    "packages/corpus/question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/item.ts",
};

/** Expected parts of the golden answer body source path. */
export const answerSourceParts = {
  artifactLocale: "id",
  bodyKind: "answer",
  contentKey:
    "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer",
  countryKey: "test-country",
  examKey: "test-exam",
  intermediateBankKeys: [],
  kind: "body",
  questionKey:
    "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1",
  questionNumber: 1,
  sectionKey: "test-section-2",
  setKey: "test-set",
  sourcePath:
    "packages/corpus/question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer.id.mdx",
};
