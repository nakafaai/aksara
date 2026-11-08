import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "negation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua kendaraan yang melintas di jalan itu tidak membayar tol dan tidak memiliki kartu elektronik.",
        },
        {
          correct: false,
          label:
            "Ada kendaraan yang melintas di jalan itu yang tidak membayar tol dan tidak memiliki kartu elektronik.",
        },
        {
          correct: false,
          label:
            "Semua kendaraan yang tidak melintas di jalan itu membayar tol dan memiliki kartu elektronik.",
        },
        {
          correct: true,
          label:
            "Ada kendaraan yang melintas di jalan itu yang tidak membayar tol atau tidak memiliki kartu elektronik.",
        },
        {
          correct: false,
          label:
            "Tidak ada kendaraan yang melintas di jalan itu yang membayar tol atau memiliki kartu elektronik.",
        },
      ],
    },
  },
};

export default item;
