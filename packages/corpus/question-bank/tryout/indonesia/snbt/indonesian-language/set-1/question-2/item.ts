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
              text: "Bumi akan kembali persis seperti pada masa lampau",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Seluruh bentuk polusi udara akan hilang" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Lingkungan mendapat kesempatan untuk memulihkan diri",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kehidupan baru pasti tercipta tanpa campur tangan manusia",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Keadaan Bumi akan menjadi tidak terkendali",
            },
          ],
        },
      ],
    },
  },
};

export default item;
