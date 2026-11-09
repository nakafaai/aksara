import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "tempe",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "memberi peringatan setelah keunggulan tempe disebut pada kalimat (7)",
        },
        {
          correct: false,
          label:
            "menjelaskan penyebab tempe lebih mudah dicerna pada kalimat (7)",
        },
        {
          correct: false,
          label:
            "menyebutkan langkah yang harus dilakukan sebelum kedelai direbus sampai matang",
        },
        {
          correct: false,
          label: "membandingkan tempe dengan kedelai rebus dari segi rasanya",
        },
        {
          correct: false,
          label:
            "memberikan contoh zat sederhana yang dihasilkan kapang selama fermentasi",
        },
      ],
    },
  },
};

export default item;
