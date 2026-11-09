import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "sentence-meaning",
    topic: "referent",
  },
  stimulus: "tempe",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "perendaman kedelai selama semalam",
        },
        {
          correct: false,
          label: "perebusan kedelai sampai matang",
        },
        {
          correct: false,
          label: "pembungkusan kedelai dengan daun pisang",
        },
        {
          correct: false,
          label: "pengupasan kulit ari kedelai",
        },
        {
          correct: true,
          label: "fermentasi kedelai oleh kapang",
        },
      ],
    },
  },
};

export default item;
