import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "angkutan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jadwal pulang bus yang lebih awal daripada akhir kegiatan ekstrakurikuler membuat siswa yang mengikuti kegiatan itu harus kembali naik ojek.",
        },
        {
          correct: false,
          label:
            "Siswa dari keluarga kurang mampu kini kurang berminat mengikuti kegiatan ekstrakurikuler.",
        },
        {
          correct: true,
          label:
            "Jadwal pulang bus yang lebih awal daripada akhir kegiatan ekstrakurikuler membuat siswa dari keluarga kurang mampu sulit mengikuti kegiatan itu.",
        },
        {
          correct: false,
          label:
            "Program bus sekolah gratis gagal meringankan pengeluaran keluarga siswa di desa-desa perbukitan.",
        },
        {
          correct: false,
          label:
            "Kegiatan ekstrakurikuler di sekolah-sekolah itu kini lebih banyak diikuti oleh siswa dari keluarga mampu.",
        },
      ],
    },
  },
};

export default item;
