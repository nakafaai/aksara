import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "unpaid-internship",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Banyak perusahaan besar sudah memberikan uang saku kepada mahasiswa magang.",
        },
        {
          correct: false,
          label:
            "Sebagian besar mahasiswa magang merasa memperoleh pengalaman yang berharga.",
        },
        {
          correct: false,
          label:
            "Biaya sewa kamar di kota-kota besar naik dalam lima tahun terakhir.",
        },
        {
          correct: true,
          label:
            "Mahasiswa dari keluarga berpenghasilan rendah mengikuti magang tanpa upah sama seringnya dengan mahasiswa dari keluarga berpenghasilan tinggi.",
        },
        {
          correct: false,
          label:
            "Sebagian lowongan magang mensyaratkan indeks prestasi kumulatif yang tinggi.",
        },
      ],
    },
  },
};

export default item;
