import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "word-choice",
  },
  stimulus: "suspension-bridge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "_membawa_ diganti _membawakan_",
        },
        {
          correct: true,
          label: "_seluas_ diganti _sejauh_",
        },
        {
          correct: false,
          label: "_memutar_ diganti _berputar_",
        },
        {
          correct: false,
          label: "_tanpa_ diganti _dengan_",
        },
        {
          correct: false,
          label: "_ke pasar_ diganti _di pasar_",
        },
      ],
    },
  },
};

export default item;
