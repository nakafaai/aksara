import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "wrong-hem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bu Lastri memotong kelebihan kain di ujung celana.",
        },
        {
          correct: true,
          label:
            "Tika menulis panjang 85 sentimeter, tetapi terbaca 95 sentimeter.",
        },
        {
          correct: true,
          label:
            "Celana yang dijahit lebih panjang sepuluh sentimeter daripada pesanan.",
        },
        {
          correct: false,
          label:
            "Kesalahan terjadi karena Tika salah mengukur panjang kakinya.",
        },
      ],
    },
  },
};

export default item;
