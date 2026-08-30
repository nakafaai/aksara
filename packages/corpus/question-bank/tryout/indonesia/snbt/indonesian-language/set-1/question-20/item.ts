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
              text: "Merekrutnya langsung sebagai pemeran utama film",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Menjadi wali yang membiayai hidupnya" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mengatur pernikahannya dengan James Dougherty",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Mengajarinya berakting di Actors Studio" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Memotretnya di pabrik dan menyarankan agar ia mencoba menjadi model",
            },
          ],
        },
      ],
    },
  },
};

export default item;
