import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "paragraph-relation",
  },
  stimulus: "gang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Paragraf ketiga menambah contoh fungsi kampung kota bagi pendatang, yaitu sebagai sumber pelanggan dan jaringan kerja.",
        },
        {
          correct: true,
          label:
            "Paragraf ketiga memakai fungsi kampung kota yang diuraikan di paragraf kedua sebagai dasar untuk menilai kebijakan terhadap kampung: penggusuran dipersoalkan, perbaikan di tempat diajukan.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga membatasi uraian paragraf kedua dengan mengakui bahwa kampung kota pada kenyataannya memang kumuh.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga menguraikan akibat dari kepadatan yang diakui di akhir paragraf kedua, yaitu penggusuran warga.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga beralih membahas kebijakan perumahan kota secara umum, sehingga kampung kota tidak lagi menjadi pokok bahasan.",
        },
      ],
    },
  },
};

export default item;
