import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "conditional-chain",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Jika robot tidak dijalankan dalam mode hemat daya, tim robotik sekolah lolos ke tingkat nasional.",
        },
        {
          correct: false,
          label:
            "Jika tim robotik sekolah lolos ke tingkat nasional, baterai cadangan dipasang.",
        },
        {
          correct: false,
          label:
            "Jika robot dijalankan dalam mode hemat daya, tim robotik sekolah tidak lolos ke tingkat nasional.",
        },
        {
          correct: false,
          label:
            "Jika sensor garis robot tidak rusak, tim robotik sekolah lolos ke tingkat nasional.",
        },
        {
          correct: false,
          label:
            "Jika tim robotik sekolah tidak lolos ke tingkat nasional, sensor garis robot rusak.",
        },
      ],
    },
  },
};

export default item;
