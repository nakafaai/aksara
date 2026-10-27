import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Setiap orang memiliki kisah yang berbeda",
        },
        {
          correct: false,
          label: "Kita tidak pernah tahu kapan kita akan sadar dan peduli",
        },
        {
          correct: false,
          label: "Saya mendapatkan fase itu lebih cepat dibanding yang lain",
        },
        {
          correct: false,
          label:
            "Kehidupan itu berputar seperti roda kadang di bawah dan kadang di atas",
        },
        {
          correct: true,
          label: "Mungkin setiap orang akan mengalami fase ini juga",
        },
      ],
    },
  },
};

export default item;
