import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "cause",
  },
  stimulus: "komodo",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "komodo terus mengejarnya selama berhari-hari",
        },
        {
          correct: false,
          label: "mangsa itu tidak dapat menemukan sumber air",
        },
        {
          correct: true,
          label: "bisa dalam gigitan menghambat pembekuan darah",
        },
        {
          correct: false,
          label: "gigi komodo patah dan tertinggal di tubuh mangsa",
        },
        {
          correct: false,
          label: "mangsa itu tersesat di semak-semak yang lebat",
        },
      ],
    },
  },
};

export default item;
