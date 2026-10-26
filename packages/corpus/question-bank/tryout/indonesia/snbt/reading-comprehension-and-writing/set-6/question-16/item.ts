import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Relawan pencatatan kebisingan memberikan komentar singkat yang tidak panjang.",
        },
        {
          correct: false,
          label:
            "Relawan pencatatan kebisingan memberikan komentar singkat sebagai relawan yang mencatat kebisingan.",
        },
        {
          correct: false,
          label:
            "Relawan pencatatan kebisingan memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          correct: true,
          label: "Relawan pencatatan kebisingan memberikan komentar singkat.",
        },
        {
          correct: false,
          label:
            "Relawan pencatatan kebisingan memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
};

export default item;
