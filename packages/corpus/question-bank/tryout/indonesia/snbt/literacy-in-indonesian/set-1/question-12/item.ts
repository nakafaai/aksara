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
            "Sekolah-sekolah lain di kabupaten itu yang tidak melarang ponsel juga mengalami kenaikan rata-rata nilai sekitar $$5$$ poin.",
        },
        {
          correct: true,
          label:
            "SMA Pelita mulai mengadakan les tambahan bagi seluruh siswa kelas akhir pada tahun ujian yang sama.",
        },
        {
          correct: false,
          label:
            "Siswa SMA Pelita dan SMA Harapan Bangsa berasal dari lingkungan dan latar keluarga yang mirip.",
        },
        {
          correct: false,
          label:
            "Guru-guru SMA Harapan Bangsa melaporkan bahwa siswa lebih tenang di kelas setelah larangan berlaku.",
        },
        {
          correct: false,
          label:
            "Sebagian siswa SMA Pelita masih menyimpan ponsel di saku selama pelajaran pada tahun itu.",
        },
      ],
    },
  },
};

export default item;
