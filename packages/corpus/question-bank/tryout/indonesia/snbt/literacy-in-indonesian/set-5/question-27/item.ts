import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "growth-mindset",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nilai semua siswa di sekolah itu naik sekitar $$0{,}1$$ poin.",
        },
        {
          correct: false,
          label:
            "Nilai semua siswa di sekolah itu naik lebih dari $$0{,}1$$ poin karena lingkungannya mendukung.",
        },
        {
          correct: false,
          label:
            "Tidak seorang pun siswa di sekolah itu terbantu, karena efek rata-rata intervensi semacam itu kecil.",
        },
        {
          correct: false,
          label:
            "Nilai siswa berprestasi tinggi di sekolah itu turun karena mereka merasa tidak perlu lagi berusaha.",
        },
        {
          correct: true,
          label:
            "Nilai sebagian besar siswa hampir tidak berubah, sedangkan sedikit siswa berprestasi rendah di sekolah itu berpeluang terbantu lebih banyak daripada siswa serupa di sekolah yang lingkungannya tidak mendukung.",
        },
      ],
    },
  },
};

export default item;
