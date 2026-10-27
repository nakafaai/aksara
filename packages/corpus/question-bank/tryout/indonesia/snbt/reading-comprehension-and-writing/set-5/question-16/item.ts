import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Operator studio rekaman sekolah memberikan komentar singkat.",
        },
        {
          correct: false,
          label:
            "Operator studio rekaman sekolah memberikan komentar singkat yang tidak panjang.",
        },
        {
          correct: false,
          label:
            "Operator studio rekaman sekolah memberikan komentar singkat di studio rekaman sekolah tempat mereka bertugas.",
        },
        {
          correct: false,
          label:
            "Operator studio rekaman sekolah memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          correct: false,
          label:
            "Operator studio rekaman sekolah memberikan komentar yang singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
};

export default item;
