import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$74\\text{ cm Hg}$$",
        },
        {
          correct: false,
          label: "$$103.2\\text{ cm Hg}$$",
        },
        {
          correct: true,
          label: "$$78\\text{ cm Hg}$$",
        },
        {
          correct: false,
          label: "$$76\\text{ cm Hg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$74\\text{ cm Hg}$$",
        },
        {
          correct: false,
          label: "$$103.2\\text{ cm Hg}$$",
        },
        {
          correct: true,
          label: "$$78\\text{ cm Hg}$$",
        },
        {
          correct: false,
          label: "$$76\\text{ cm Hg}$$",
        },
      ],
    },
  },
};

export default item;
