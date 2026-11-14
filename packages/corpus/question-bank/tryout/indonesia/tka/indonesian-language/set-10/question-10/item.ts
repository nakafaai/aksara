import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "grandma-recipe",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Percobaan pertama membuat nastar melebar di loyang.",
        },
        {
          correct: true,
          label:
            "Sinta menambahkan tepung sedikit demi sedikit sambil meremas adonan seperti yang ditunjukkan Ibu, lalu berhasil pada percobaan keempat.",
        },
        { correct: false, label: "Buku resep itu disimpan di laci dapur." },
        {
          correct: false,
          label: "Adik Ibu bertanya siapa yang akan membuat nastar.",
        },
        {
          correct: false,
          label: "Resep itu ditulis dengan tulisan tangan yang miring.",
        },
      ],
    },
  },
};

export default item;
