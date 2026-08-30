import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Setiap orang memiliki kisah yang berbeda" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Mungkin setiap orang akan mengalami fase ini juga",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kita tidak pernah tahu kapan kita akan sadar dan peduli",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Saya mendapatkan fase itu lebih cepat dibanding yang lain",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kehidupan itu berputar seperti roda kadang di bawah dan kadang di atas",
            },
          ],
        },
      ],
    },
  },
};

export default item;
