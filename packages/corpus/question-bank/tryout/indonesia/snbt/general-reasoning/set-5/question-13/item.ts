import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "negation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setiap peserta kursus tata boga yang tidak menerima sertifikat tidak hadir sejak hari pertama dan tidak mengumpulkan laporan praktik.",
        },
        {
          correct: false,
          label:
            "Beberapa peserta kursus tata boga yang tidak hadir sejak hari pertama atau tidak mengumpulkan laporan praktik menerima sertifikat.",
        },
        {
          correct: true,
          label:
            "Setiap peserta kursus tata boga yang hadir sejak hari pertama, tetapi tidak menerima sertifikat, tidak mengumpulkan laporan praktik.",
        },
        {
          correct: false,
          label:
            "Setiap peserta kursus tata boga yang hadir sejak hari pertama, tetapi tidak mengumpulkan laporan praktik, tidak menerima sertifikat.",
        },
        {
          correct: false,
          label:
            "Setiap peserta kursus tata boga yang menerima sertifikat hadir sejak hari pertama dan mengumpulkan laporan praktik.",
        },
      ],
    },
  },
};

export default item;
