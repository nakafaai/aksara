import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "breakfast-survey",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "40 siswa",
        },
        {
          correct: false,
          label: "60 siswa",
        },
        {
          correct: true,
          label: "133 siswa",
        },
        {
          correct: false,
          label: "160 siswa",
        },
        {
          correct: false,
          label: "220 siswa",
        },
      ],
    },
  },
};

export default item;
