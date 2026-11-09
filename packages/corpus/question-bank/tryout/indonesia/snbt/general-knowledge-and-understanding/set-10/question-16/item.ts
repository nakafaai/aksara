import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "figurative-meaning",
  },
  stimulus: "kunang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "membuat kunang-kunang jatuh dan tenggelam ke dalam air",
        },
        {
          correct: false,
          label: "membuat kedipan kunang-kunang menjadi lebih terang",
        },
        {
          correct: false,
          label: "membuat kunang-kunang berkedip jauh lebih cepat",
        },
        {
          correct: false,
          label: "membuat cahaya lampu jalan tampak lebih redup",
        },
        {
          correct: true,
          label: "membuat kedipan kunang-kunang sulit terlihat",
        },
      ],
    },
  },
};

export default item;
