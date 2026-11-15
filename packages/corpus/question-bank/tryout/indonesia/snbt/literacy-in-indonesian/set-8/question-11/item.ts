import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "science-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kajian itu hanya memakai $$400$$ artikel, sehingga jumlahnya terlalu sedikit untuk dihitung rata-ratanya.",
        },
        {
          correct: false,
          label:
            "Kajian itu menghitung sitasi selama lima tahun, padahal artikel berbahasa Indonesia baru dikutip sesudah sepuluh tahun.",
        },
        {
          correct: true,
          label:
            "Artikel berbahasa Inggris dapat berbeda dalam dana dan pengalaman tim, sehingga selisih sitasi belum tentu disebabkan oleh bahasa.",
        },
        {
          correct: false,
          label:
            "Artikel berbahasa Indonesia sebenarnya lebih bermutu, sehingga sitasinya yang rendah tidak penting.",
        },
        {
          correct: false,
          label:
            "Kajian itu dilakukan di satu universitas, sehingga hasilnya sama sekali tidak dapat dipakai di universitas lain di Indonesia.",
        },
      ],
    },
  },
};

export default item;
