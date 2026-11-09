import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "analogy",
  },
  stimulus: "lebah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "madu : lebah",
        },
        {
          correct: true,
          label: "mawar : bunga",
        },
        {
          correct: false,
          label: "petani : kebun",
        },
        {
          correct: false,
          label: "serbuk sari : putik",
        },
        {
          correct: false,
          label: "pestisida : hama",
        },
      ],
    },
  },
};

export default item;
