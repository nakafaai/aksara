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
        { correct: false, label: "Propyl propanoate, $$6.96\\text{ g}$$" },
        { correct: false, label: "Ethyl propanoate, $$5.57\\text{ g}$$" },
        { correct: false, label: "Propyl propanoate, $$9.28\\text{ g}$$" },
        { correct: true, label: "Propyl propanoate, $$5.57\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Propil propanoat, $$6.96\\text{ g}$$" },
        { correct: false, label: "Etil propanoat, $$5.57\\text{ g}$$" },
        { correct: false, label: "Propil propanoat, $$9.28\\text{ g}$$" },
        { correct: true, label: "Propil propanoat, $$5.57\\text{ g}$$" },
      ],
    },
  },
};

export default item;
