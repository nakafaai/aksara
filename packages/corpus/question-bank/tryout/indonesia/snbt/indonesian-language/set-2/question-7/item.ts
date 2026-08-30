import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Semua bacaannya merupakan karya terkenal" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua fitur dapat digunakan tanpa berlangganan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Aplikasi dapat digunakan tanpa perangkat digital",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Aplikasi tidak memerlukan ruang penyimpanan",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Bacaan tersedia dalam berbagai bahasa" },
          ],
        },
      ],
    },
  },
};

export default item;
