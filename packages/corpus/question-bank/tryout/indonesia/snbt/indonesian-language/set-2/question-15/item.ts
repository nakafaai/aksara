import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tahapan mengidentifikasi gajah sasaran",
        },
        {
          isCorrect: false,
          label: "Perkiraan populasi gajah sumatra di Riau",
        },
        {
          isCorrect: true,
          label:
            "Pemanfaatan GPS Collar untuk memitigasi interaksi negatif manusia dan gajah",
        },
        {
          isCorrect: false,
          label: "Peran BBKSDA Riau dalam konservasi satwa liar",
        },
        {
          isCorrect: false,
          label: "Kerja sama masyarakat dalam memulihkan habitat gajah",
        },
      ],
    },
  },
};

export default item;
