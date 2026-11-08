import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "front-labels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menjelaskan mengapa tabel di belakang kemasan jarang dipakai pembeli",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa pembeli tidak peduli pada kesehatan mereka sendiri",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa tanda di Chili berhasil menurunkan pembelian",
        },
        {
          correct: false,
          label:
            "mengkritik produsen yang mengubah resep agar lolos dari tanda",
        },
        {
          correct: false,
          label:
            "menyarankan agar toko memberi pembeli waktu belanja lebih lama",
        },
      ],
    },
  },
};

export default item;
