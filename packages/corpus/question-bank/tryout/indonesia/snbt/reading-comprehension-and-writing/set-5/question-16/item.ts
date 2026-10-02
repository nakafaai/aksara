import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Operator studio rekaman sekolah memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Operator studio rekaman sekolah memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: false,
          label:
            "Operator studio rekaman sekolah memberikan komentar singkat di studio rekaman sekolah tempat mereka bertugas.",
        },
        {
          isCorrect: false,
          label:
            "Operator studio rekaman sekolah memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: false,
          label:
            "Operator studio rekaman sekolah memberikan komentar yang singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
