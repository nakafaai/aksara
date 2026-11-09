import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "net-recycling",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pabrik karpet",
        },
        {
          correct: true,
          label: "jaring yang sudah dicuci dan dipotong-potong",
        },
        {
          correct: false,
          label: "koperasi nelayan",
        },
        {
          correct: false,
          label: "benang",
        },
        {
          correct: false,
          label: "karpet",
        },
      ],
    },
  },
};

export default item;
