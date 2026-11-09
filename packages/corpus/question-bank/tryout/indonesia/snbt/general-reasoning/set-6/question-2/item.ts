import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "weakening",
  },
  stimulus: "piring",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Piring berdiameter $$23$$ cm lebih mudah dicuci dan disimpan.",
        },
        {
          correct: false,
          label:
            "Menu dan harga makan siang tidak berubah selama delapan minggu itu.",
        },
        {
          correct: false,
          label:
            "Sebagian karyawan mengatakan lebih menyukai piring yang besar.",
        },
        {
          correct: false,
          label:
            "Kantin lain di gedung yang sama juga mencatat sisa makanan yang lebih sedikit setelah beralih ke piring kecil.",
        },
        {
          correct: true,
          label:
            "Empat minggu kedua bertepatan dengan cuaca sangat panas, saat porsi makan siang biasanya mengecil.",
        },
      ],
    },
  },
};

export default item;
