import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Anak memperoleh sedikit lemak dan vitamin B6",
        },
        {
          isCorrect: true,
          label: "Anak tidak akan mendapatkan lemak",
        },
        {
          isCorrect: false,
          label: "Sebagian anak yang makan pisang memperoleh sedikit lemak",
        },
        {
          isCorrect: false,
          label:
            "Pisang bukan satu-satunya makanan yang dapat memberikan vitamin B6",
        },
        {
          isCorrect: false,
          label: "Sebagian anak yang makan pisang memperoleh vitamin B6",
        },
      ],
    },
  },
};

export default item;
