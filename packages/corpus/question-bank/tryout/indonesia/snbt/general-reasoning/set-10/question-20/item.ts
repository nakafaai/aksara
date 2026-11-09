import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "elimination",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kunci merah",
        },
        {
          correct: false,
          label: "kunci biru",
        },
        {
          correct: true,
          label: "kunci hijau",
        },
        {
          correct: false,
          label: "kunci kuning",
        },
        {
          correct: false,
          label: "tidak dapat dipastikan dari keterangan itu",
        },
      ],
    },
  },
};

export default item;
