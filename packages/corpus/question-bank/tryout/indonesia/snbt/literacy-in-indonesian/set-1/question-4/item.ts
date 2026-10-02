import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Setiap orang memiliki kisah yang berbeda",
        },
        {
          isCorrect: false,
          label: "Kita tidak pernah tahu kapan kita akan sadar dan peduli",
        },
        {
          isCorrect: false,
          label: "Saya mendapatkan fase itu lebih cepat dibanding yang lain",
        },
        {
          isCorrect: false,
          label:
            "Kehidupan itu berputar seperti roda kadang di bawah dan kadang di atas",
        },
        {
          isCorrect: true,
          label: "Mungkin setiap orang akan mengalami fase ini juga",
        },
      ],
    },
  },
};

export default item;
