import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "phone-ban",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "laporan tambahan dari guru-guru SMA Harapan Bangsa bahwa siswa lebih tenang dan lebih fokus di kelas setelah larangan berlaku",
        },
        {
          correct: true,
          label:
            "data bahwa sekolah lain yang juga berganti format ujian tetapi tidak melarang ponsel rata-rata hanya naik sekitar $$1$$ poin",
        },
        {
          correct: false,
          label:
            "hasil survei bahwa sebagian besar siswa dan orang tua di SMA Harapan Bangsa menyukai larangan ponsel itu",
        },
        {
          correct: false,
          label:
            "rata-rata nilai ujian akhir SMA Harapan Bangsa pada 2025, setahun setelah larangan berjalan dengan format ujian yang sama",
        },
        {
          correct: false,
          label:
            "data bahwa SMA Pelita memiliki lebih sedikit siswa dan guru daripada SMA Harapan Bangsa pada tahun yang sama",
        },
      ],
    },
  },
};

export default item;
