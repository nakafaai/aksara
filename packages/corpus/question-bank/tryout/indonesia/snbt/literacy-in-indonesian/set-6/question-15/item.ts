import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument",
  },
  stimulus: "ride-hailing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Penulis Teks B memakai pengalamannya sendiri sebagai pengemudi sambilan, padahal Teks A berbicara tentang pengemudi yang bergantung penuh pada aplikasi untuk penghasilannya.",
        },
        {
          correct: false,
          label:
            "Penulis Teks B tidak mengakui masalah potongan dan pemutusan akun yang disebut Teks A.",
        },
        {
          correct: false,
          label:
            "Penulis Teks B menyebut kebijakan di luar negeri tanpa menunjukkan bahwa kebijakan itu buruk.",
        },
        {
          correct: false,
          label:
            "Penulis Teks B mengusulkan perlindungan yang lebih mahal bagi perusahaan daripada usul Teks A.",
        },
        {
          correct: false,
          label: "Penulis Teks B tidak pernah mengemudi pada hari kerja.",
        },
      ],
    },
  },
};

export default item;
