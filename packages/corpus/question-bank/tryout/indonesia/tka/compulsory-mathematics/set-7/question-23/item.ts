import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "gaji",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Selisih antara gaji tertinggi dan gaji terendah di perusahaan itu paling sedikit $$\\text{Rp}2{,}4\\text{ juta}$$.",
        },
        {
          correct: false,
          label:
            "Jika seorang karyawan bagian desain keluar, rata-rata gaji seluruh karyawan yang tersisa turun.",
        },
        {
          correct: false,
          label:
            "Median gaji seluruh karyawan kurang dari $$\\text{Rp}5{,}4\\text{ juta}$$.",
        },
        {
          correct: true,
          label:
            "Jika seorang karyawan bagian desain yang gajinya lebih dari $$\\text{Rp}4{,}8\\text{ juta}$$ tetapi kurang dari $$\\text{Rp}7{,}2\\text{ juta}$$ pindah ke bagian jahit dengan gaji tetap, rata-rata gaji kedua bagian sama-sama naik.",
        },
        {
          correct: true,
          label:
            "Jika karyawan bagian jahit yang gajinya paling rendah keluar, rata-rata gaji bagian jahit tidak turun.",
        },
      ],
    },
  },
};

export default item;
