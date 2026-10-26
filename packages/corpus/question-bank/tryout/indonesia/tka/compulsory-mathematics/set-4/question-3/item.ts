import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Luas kertas A4 adalah $$\\frac{1}{16}\\text{ m}^2$$.",
        },
        {
          correct: true,
          label: "Sisi panjang kertas A3 sama dengan sisi pendek kertas A2.",
        },
        {
          correct: false,
          label:
            "Agar sebuah gambar yang tepat memenuhi selembar kertas A4 dapat diperbesar tanpa mengubah bentuknya sehingga tepat memenuhi selembar kertas A3, setiap ukuran panjang pada gambar itu dikalikan $$2$$.",
        },
        {
          correct: true,
          label: "Keliling kertas A2 sama dengan dua kali keliling kertas A4.",
        },
        {
          correct: false,
          label: "Sisi panjang kertas A1 adalah $$\\sqrt[4]{2}\\text{ m}$$.",
        },
      ],
    },
  },
};

export default item;
