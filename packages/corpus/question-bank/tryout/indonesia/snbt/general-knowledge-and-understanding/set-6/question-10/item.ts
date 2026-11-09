import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-function",
  },
  stimulus: "abu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "memberikan sisi baik abu vulkanik setelah dampak buruknya dijelaskan",
        },
        {
          correct: false,
          label:
            "membantah bahaya awan abu bagi penerbangan yang disebut sebelumnya",
        },
        {
          correct: false,
          label: "memberikan contoh lain dampak buruk abu vulkanik di darat",
        },
        {
          correct: false,
          label:
            "menjelaskan cara membersihkan abu yang menumpuk di atap rumah",
        },
        {
          correct: false,
          label:
            "menyimpulkan bahwa abu vulkanik sebenarnya tidak berbahaya bagi siapa pun",
        },
      ],
    },
  },
};

export default item;
