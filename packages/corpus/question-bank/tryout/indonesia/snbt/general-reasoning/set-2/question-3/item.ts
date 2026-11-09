import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "inference",
  },
  stimulus: "sekolah",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Selisih jam masuk kedua kelompok sekolah adalah $$45$$ menit.",
        },
        {
          column: 1,
          label:
            "Angka keterlambatan di sekolah yang memundurkan jam masuk turun lebih dari separuhnya.",
        },
        {
          column: 2,
          label:
            "Siswa di sekolah yang tetap masuk pukul $$06.30$$ tidur lebih lama daripada tahun sebelumnya.",
        },
        {
          column: 2,
          label:
            "Perubahan jam masuk membuat semua kegiatan di sekolah tersebut berakhir menjelang magrib.",
        },
      ],
    },
  },
};

export default item;
