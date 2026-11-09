import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "water-stunting",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jumlah puskesmas di seluruh kabupaten itu pada tahun yang sama.",
        },
        {
          correct: false,
          label:
            "Rata-rata pendapatan rumah tangga di keempat desa itu pada tahun pendataan berikutnya.",
        },
        {
          correct: false,
          label:
            "Jumlah balita di setiap desa yang lahir pada tahun pendataan.",
        },
        {
          correct: true,
          label:
            "Persentase stunting pada keluarga berpendapatan setara yang akses airnya berbeda.",
        },
        {
          correct: false,
          label:
            "Pendapat para ibu tentang rasa air minum di desa masing-masing.",
        },
      ],
    },
  },
};

export default item;
