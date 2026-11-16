import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-composition-in-a-cell",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "S, $$56\\text{ mg}$$" },
        { correct: false, label: "P, $$40\\text{ mg}$$" },
        { correct: false, label: "Q, $$48\\text{ mg}$$" },
        { correct: true, label: "S, $$36\\text{ mg}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "S, $$56\\text{ mg}$$" },
        { correct: false, label: "P, $$40\\text{ mg}$$" },
        { correct: false, label: "Q, $$48\\text{ mg}$$" },
        { correct: true, label: "S, $$36\\text{ mg}$$" },
      ],
    },
  },
};

export default item;
