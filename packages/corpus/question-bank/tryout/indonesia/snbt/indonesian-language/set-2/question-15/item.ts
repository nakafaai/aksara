import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tahapan mengidentifikasi gajah sasaran" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Perkiraan populasi gajah sumatra di Riau" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pemanfaatan GPS Collar untuk memitigasi interaksi negatif manusia dan gajah",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Peran BBKSDA Riau dalam konservasi satwa liar",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kerja sama masyarakat dalam memulihkan habitat gajah",
            },
          ],
        },
      ],
    },
  },
};

export default item;
