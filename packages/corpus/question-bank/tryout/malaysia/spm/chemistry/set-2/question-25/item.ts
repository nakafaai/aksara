import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "Zinc decreases by $$0.65\\text{ g}$$, copper increases by $$0.64\\text{ g}$$" },
        { correct: false, label: "Zinc increases by $$0.65\\text{ g}$$, copper decreases by $$0.64\\text{ g}$$" },
        { correct: false, label: "Zinc decreases by $$1.30\\text{ g}$$, copper increases by $$1.28\\text{ g}$$" },
        { correct: false, label: "Zinc decreases by $$0.65\\text{ g}$$, copper increases by $$1.28\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Zink berkurang $$0.65\\text{ g}$$, kuprum bertambah $$0.64\\text{ g}$$" },
        { correct: false, label: "Zink bertambah $$0.65\\text{ g}$$, kuprum berkurang $$0.64\\text{ g}$$" },
        { correct: false, label: "Zink berkurang $$1.30\\text{ g}$$, kuprum bertambah $$1.28\\text{ g}$$" },
        { correct: false, label: "Zink berkurang $$0.65\\text{ g}$$, kuprum bertambah $$1.28\\text{ g}$$" },
      ],
    },
  },
};

export default item;
