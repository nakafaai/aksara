import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "argument-structure",
  },
  stimulus: "homework-debate",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menjawab keberatan yang mungkin diajukan terhadap usul penulis",
        },
        {
          correct: false,
          label:
            "menyajikan data penelitian baru yang mendukung penghapusan pekerjaan rumah",
        },
        {
          correct: false,
          label:
            "mengakui bahwa usul penulis memang dapat memanjakan anak-anak",
        },
        {
          correct: false,
          label:
            "mengalihkan pembahasan ke soal beban kerja para guru di kelas",
        },
        {
          correct: false,
          label:
            "menyimpulkan bahwa pekerjaan rumah mungkin perlu dihapus di semua jenjang",
        },
      ],
    },
  },
};

export default item;
