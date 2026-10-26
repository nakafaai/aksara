import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Anak memperoleh sedikit lemak dan vitamin B6",
        },
        {
          correct: true,
          label: "Anak tidak akan mendapatkan lemak",
        },
        {
          correct: false,
          label: "Sebagian anak yang makan pisang memperoleh sedikit lemak",
        },
        {
          correct: false,
          label:
            "Pisang bukan satu-satunya makanan yang dapat memberikan vitamin B6",
        },
        {
          correct: false,
          label: "Sebagian anak yang makan pisang memperoleh vitamin B6",
        },
      ],
    },
  },
};

export default item;
