import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "unpaid-internship",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua bentuk magang bagi mahasiswa sebaiknya dihapus karena lebih banyak merugikan daripada menguntungkan.",
        },
        {
          correct: true,
          label:
            "Magang tanpa upah perlu dibatasi karena mempersempit kesempatan mahasiswa kurang mampu dan menggeser pekerja.",
        },
        {
          correct: false,
          label:
            "Mahasiswa magang seharusnya dibayar setara dengan karyawan tetap sejak hari pertama bekerja.",
        },
        {
          correct: false,
          label:
            "Perusahaan rintisan dan lembaga nirlaba sebaiknya tidak menerima mahasiswa magang.",
        },
        {
          correct: false,
          label:
            "Mahasiswa sebaiknya menolak semua tawaran magang yang tidak memberikan sertifikat.",
        },
      ],
    },
  },
};

export default item;
