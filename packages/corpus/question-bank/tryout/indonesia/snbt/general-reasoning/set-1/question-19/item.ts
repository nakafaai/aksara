import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifier",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Rina bukan pegawai bagian keuangan.",
        },
        {
          correct: false,
          label:
            "Semua pegawai yang bukan bagian keuangan mengajukan cuti panjang.",
        },
        {
          correct: false,
          label: "Sebagian pegawai bagian keuangan mengajukan cuti panjang.",
        },
        {
          correct: false,
          label:
            "Setiap pegawai yang tidak mengajukan cuti panjang adalah pegawai bagian keuangan.",
        },
        {
          correct: false,
          label:
            "Semua pegawai yang telah bekerja lebih dari dua tahun mengajukan cuti panjang.",
        },
      ],
    },
  },
};

export default item;
