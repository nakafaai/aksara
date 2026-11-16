import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(0.0942 \\pm 0.0006)\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label: "$$(0.0471 \\pm 0.0003)\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$(0.0471 \\pm 0.0002)\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$(0.0471 \\pm 0.0001)\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(0.0942 \\pm 0.0006)\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label: "$$(0.0471 \\pm 0.0003)\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$(0.0471 \\pm 0.0002)\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$(0.0471 \\pm 0.0001)\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
