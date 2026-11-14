import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "wrong-hem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tika membuang celana itu karena sudah tidak muat lagi",
        },
        {
          correct: true,
          label:
            "Tika membawa celana itu ke Bu Lastri untuk membuka lipatannya setelah ia bertambah tinggi",
        },
        {
          correct: false,
          label:
            "Tika menulis ukuran pesanannya hanya dengan angka yang miring",
        },
        {
          correct: false,
          label: "Bu Lastri menolak menerima pesanan dari Tika",
        },
        {
          correct: false,
          label: "Tika memesan seragam di penjahit lain karena kecewa",
        },
      ],
    },
  },
};

export default item;
