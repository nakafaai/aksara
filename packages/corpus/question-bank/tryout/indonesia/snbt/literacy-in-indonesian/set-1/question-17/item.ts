import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "food-waste",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Membandingkan angka survei bulan Maret dengan berat sampah yang masuk ke tempat pembuangan akhir setelah kampanye.",
        },
        {
          correct: true,
          label:
            "Membandingkan hasil penimbangan sebelum dan sesudah kampanye yang dilakukan dengan cara dan lama pengamatan yang sama.",
        },
        {
          correct: false,
          label:
            "Menanyakan kepada responden apakah mereka merasa lebih jarang membuang nasi setelah kampanye.",
        },
        {
          correct: false,
          label:
            "Membandingkan sisa nasi dengan sisa sayur setelah kampanye selesai.",
        },
        {
          correct: false,
          label:
            "Menimbang sisa makanan hanya pada rumah tangga yang paling aktif mengikuti kampanye.",
        },
      ],
    },
  },
};

export default item;
