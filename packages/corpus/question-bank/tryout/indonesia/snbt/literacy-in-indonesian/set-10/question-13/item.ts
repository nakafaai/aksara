import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme-message",
  },
  stimulus: "village-postman",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Teknologi baru sebaiknya ditolak karena merenggangkan hubungan keluarga.",
        },
        {
          correct: false,
          label:
            "Pekerjaan tukang pos sudah tidak lagi diperlukan di daerah pedesaan.",
        },
        {
          correct: false,
          label:
            "Anak yang merantau wajib pulang setiap tahun untuk menemui kedua orang tuanya.",
        },
        {
          correct: false,
          label:
            "Surat kilat selalu lebih berharga daripada surat yang dikirim biasa.",
        },
        {
          correct: true,
          label:
            "Kepedulian sederhana dapat menjawab kerinduan yang tidak dipenuhi teknologi.",
        },
      ],
    },
  },
};

export default item;
