import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "all of it, $$17.6\\text{ g}$$" },
        { correct: false, label: "half of it, $$4.40\\text{ g}$$" },
        { correct: true, label: "half of it, $$8.80\\text{ g}$$" },
        { correct: false, label: "one third of it, $$5.87\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "semuanya, $$17.6\\text{ g}$$" },
        { correct: false, label: "separuh daripadanya, $$4.40\\text{ g}$$" },
        { correct: true, label: "separuh daripadanya, $$8.80\\text{ g}$$" },
        {
          correct: false,
          label: "satu pertiga daripadanya, $$5.87\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
