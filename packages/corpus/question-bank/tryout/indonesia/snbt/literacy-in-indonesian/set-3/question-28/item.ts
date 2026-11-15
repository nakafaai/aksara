import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "anchoring-price",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Siswa di kelompok kedua lebih sering membeli madu di rumah daripada siswa di dua kelompok lainnya.",
        },
        {
          correct: false,
          label:
            "Kelompok pertama dan kedua sama-sama menulis harga lebih rendah setelah diberi tahu harga madu di pasar.",
        },
        {
          correct: true,
          label:
            "Kelompok tambahan yang diberi tahu bahwa Rp$$160{.}000$$ diambil dengan undian tetap menulis harga hampir sama dengan kelompok kedua.",
        },
        {
          correct: false,
          label:
            "Pedagang madu di pasar menulis harga yang lebih dekat dengan harga pasar daripada siswa di ketiga kelompok.",
        },
        {
          correct: false,
          label:
            "Kelompok tambahan yang mendengar angka Rp$$160{.}000$$ tanpa pertanyaan lebih mahal atau lebih murah menulis harga lebih tinggi lagi.",
        },
      ],
    },
  },
};

export default item;
