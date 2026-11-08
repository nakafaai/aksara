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
            "Semua bentuk magang bagi mahasiswa sebaiknya dihapus karena merugikan.",
        },
        {
          correct: true,
          label:
            "Magang tanpa upah yang berisi pekerjaan nyata perlu dibatasi karena mempersempit kesempatan mahasiswa yang kurang mampu dan menggeser pekerja bergaji.",
        },
        {
          correct: false,
          label:
            "Mahasiswa magang seharusnya dibayar setara dengan karyawan tetap.",
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
