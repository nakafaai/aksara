import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "assumption",
  },
  stimulus: "kantor",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semua karyawan menyukai tanaman hias.",
        },
        {
          correct: true,
          label:
            "Turunnya izin sakit tidak terutama disebabkan oleh perubahan musim antara kedua periode.",
        },
        {
          correct: false,
          label: "Tanaman hias di setiap meja memiliki jenis yang sama.",
        },
        {
          correct: false,
          label: "Survei kenyamanan diisi oleh seluruh karyawan.",
        },
        {
          correct: false,
          label:
            "Perusahaan berencana menambah jumlah tanaman hias di ruang rapat dan lobi pada tahun berikutnya.",
        },
      ],
    },
  },
};

export default item;
