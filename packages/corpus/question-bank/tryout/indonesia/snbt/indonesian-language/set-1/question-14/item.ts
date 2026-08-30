import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Berendam di dalam lumpur" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Bekerja dengan sangat sibuk" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Berkumpul dalam satu kelompok" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Berlumuran oleh suatu benda" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Terjebak dalam keadaan yang tidak menyenangkan",
            },
          ],
        },
      ],
    },
  },
};

export default item;
