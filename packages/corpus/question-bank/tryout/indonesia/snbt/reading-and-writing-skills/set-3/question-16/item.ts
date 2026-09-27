import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Peserta lokakarya kompos memberikan komentar singkat yang singkat.",
        },
        {
          isCorrect: false,
          label:
            "Peserta lokakarya kompos memberikan komentar singkat dengan panjang komentar yang singkat.",
        },
        {
          isCorrect: true,
          label: "Peserta lokakarya kompos memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Peserta lokakarya kompos memberikan komentar singkat dalam bentuk pendek.",
        },
        {
          isCorrect: false,
          label:
            "Peserta lokakarya kompos memberikan komentar singkat di lokakarya kompos tersebut.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
