import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "belajar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Jika dua siswa baru dengan nilai $$69$$ dan $$71$$ bergabung, median nilai naik, sedangkan rata-rata nilai tetap.",
        },
        {
          correct: false,
          label: "Jika nilai Asri dikoreksi dari $$72$$ menjadi $$80$$, median nilai naik.",
        },
        {
          correct: true,
          label:
            "Jika nilai Indra seharusnya $$74$$ dan nilai Bima seharusnya $$82$$, rata-rata nilai tetap, sedangkan median nilai naik tepat $$2$$.",
        },
        {
          correct: false,
          label: "Jika Dani keluar dari kelas, median nilai naik, sedangkan rata-rata nilai tetap.",
        },
        {
          correct: false,
          label:
            "Jika siswa dengan jam belajar paling sedikit dan siswa dengan jam belajar paling banyak sama-sama keluar, rata-rata nilai tidak berubah.",
        },
      ],
    },
  },
};

export default item;
