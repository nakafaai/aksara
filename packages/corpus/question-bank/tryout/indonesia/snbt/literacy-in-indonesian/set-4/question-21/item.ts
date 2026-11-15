import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "balai-pustaka",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Penyebaran bacaan dan penyaringan isinya di Balai Pustaka adalah dua sisi dari satu kebijakan kolonial.",
        },
        {
          correct: false,
          label:
            "Balai Pustaka berjasa besar bagi sastra Indonesia karena menerbitkan novel-novel yang kini dibaca di sekolah.",
        },
        {
          correct: false,
          label:
            "Balai Pustaka pada dasarnya hanyalah alat sensor, sehingga jasanya menyebarkan bacaan tidak perlu diperhitungkan.",
        },
        {
          correct: false,
          label:
            "Bacaan liar lebih bermutu daripada terbitan Balai Pustaka karena ditulis tanpa pedoman dari pemerintah kolonial.",
        },
        {
          correct: false,
          label:
            "Balai Pustaka didirikan pada 1917 untuk menggantikan sekolah pribumi yang dinilai gagal mengajarkan membaca.",
        },
      ],
    },
  },
};

export default item;
