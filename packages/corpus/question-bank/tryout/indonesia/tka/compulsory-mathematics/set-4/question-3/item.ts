import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Luas kertas A4 adalah $$\\frac{1}{16}\\text{ m}^2$$.",
        },
        {
          isCorrect: true,
          label: "Sisi panjang kertas A3 sama dengan sisi pendek kertas A2.",
        },
        {
          isCorrect: false,
          label:
            "Agar sebuah gambar yang tepat memenuhi selembar kertas A4 dapat diperbesar tanpa mengubah bentuknya sehingga tepat memenuhi selembar kertas A3, setiap ukuran panjang pada gambar itu dikalikan $$2$$.",
        },
        {
          isCorrect: true,
          label: "Keliling kertas A2 sama dengan dua kali keliling kertas A4.",
        },
        {
          isCorrect: false,
          label: "Sisi panjang kertas A1 adalah $$\\sqrt[4]{2}\\text{ m}$$.",
        },
      ],
    },
  },
};

export default item;
