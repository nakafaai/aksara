import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "ai-homework",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "meminta siswa menjelaskan esainya secara lisan dan memakai alat pendeteksi untuk memastikan hasilnya",
        },
        {
          correct: false,
          label:
            "meminta siswa menjelaskan esainya secara lisan dan melarang kecerdasan buatan untuk semua tugas",
        },
        {
          correct: false,
          label:
            "meminta siswa menjelaskan esainya secara lisan dan membolehkan kecerdasan buatan untuk semua tugas tanpa syarat",
        },
        {
          correct: true,
          label:
            "meminta siswa menjelaskan esainya secara lisan, tanpa menambahkan larangan, alat pendeteksi, atau izin memakai mesin",
        },
        {
          correct: false,
          label:
            "meminta siswa menjelaskan esainya secara lisan dan menilai esai dari kerapian bahasanya",
        },
      ],
    },
  },
};

export default item;
