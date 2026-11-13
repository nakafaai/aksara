import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "cause-effect",
  },
  stimulus: "estuary",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1{,}443$$ birds",
        },
        {
          correct: false,
          label: "$$1{,}468$$ birds",
        },
        {
          correct: false,
          label: "$$1{,}581$$ birds",
        },
        {
          correct: false,
          label: "$$1{,}158$$ birds",
        },
        {
          correct: false,
          label: "$$665$$ birds",
        },
      ],
    },
  },
};

export default item;
