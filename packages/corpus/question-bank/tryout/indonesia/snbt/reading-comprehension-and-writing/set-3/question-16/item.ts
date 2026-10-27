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
            "Peserta lokakarya kompos memberikan komentar singkat yang singkat.",
        },
        {
          correct: false,
          label:
            "Peserta lokakarya kompos memberikan komentar singkat dengan panjang komentar yang singkat.",
        },
        {
          correct: true,
          label: "Peserta lokakarya kompos memberikan komentar singkat.",
        },
        {
          correct: false,
          label:
            "Peserta lokakarya kompos memberikan komentar singkat dalam bentuk pendek.",
        },
        {
          correct: false,
          label:
            "Peserta lokakarya kompos memberikan komentar singkat di lokakarya kompos tersebut.",
        },
      ],
    },
  },
};

export default item;
