import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua individu hidup pada masa yang sama tetapi bekerja berbeda",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Jasad berasal dari beberapa masa dan kelompok leluhur genetik",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Seluruh individu merupakan anggota satu pasukan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penelitian hanya menganalisis satu kerangka manusia",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "DNA membuktikan bahwa wabah menewaskan seluruh individu",
            },
          ],
        },
      ],
    },
  },
};

export default item;
