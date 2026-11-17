import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "About $$46\\%$$, and $$8.5\\text{ A}$$" },
        { correct: false, label: "Never, so no current flows" },
        { correct: true, label: "About $$23\\%$$, and $$8.5\\text{ A}$$" },
        { correct: false, label: "About $$25\\%$$, and $$9.9\\text{ A}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kira-kira $$46\\%$$, dan $$8.5\\text{ A}$$" },
        { correct: false, label: "Tidak pernah, jadi tiada arus mengalir" },
        { correct: true, label: "Kira-kira $$23\\%$$, dan $$8.5\\text{ A}$$" },
        { correct: false, label: "Kira-kira $$25\\%$$, dan $$9.9\\text{ A}$$" },
      ],
    },
  },
};

export default item;
