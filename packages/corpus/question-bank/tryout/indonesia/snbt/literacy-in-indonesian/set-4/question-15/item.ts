import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "class-size",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Batas ukuran kelas yang direncanakan sama-sama $$20$$ siswa per kelas.",
        },
        {
          correct: true,
          label:
            "Kebijakannya sama-sama menuntut banyak guru baru, padahal guru layak yang tersedia jauh lebih sedikit.",
        },
        {
          correct: false,
          label:
            "Pembagian siswa ke kelas kecil dan kelas biasa sama-sama dilakukan secara acak.",
        },
        {
          correct: false,
          label:
            "Kebijakannya sama-sama dimulai dari sekolah-sekolah di kawasan miskin.",
        },
        {
          correct: false,
          label:
            "Nilai tes siswa kelas kecil sama-sama turun setelah kebijakan dijalankan.",
        },
      ],
    },
  },
};

export default item;
