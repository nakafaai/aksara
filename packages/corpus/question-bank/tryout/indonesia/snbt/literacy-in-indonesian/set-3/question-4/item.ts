import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "wolbachia-mosquito",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Paragraf ketiga mengakui kelemahan rancangan uji, lalu paragraf kelima membantah kelemahan itu dengan data efikasi.",
        },
        {
          correct: false,
          label:
            "Paragraf kelima menunjukkan bahwa pengacakan per klaster gagal, sehingga angka efikasi perlu dikoreksi menjadi lebih kecil.",
        },
        {
          correct: true,
          label:
            "Keduanya bersumber pada gerak bebas nyamuk, yang memaksa pengacakan per wilayah dan sekaligus dapat memperkecil selisih antarkelompok.",
        },
        {
          correct: false,
          label:
            "Keduanya menjelaskan mengapa uji ini tidak terpengaruh oleh naik turunnya kasus demam berdarah dari tahun ke tahun.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga memberi alasan etis untuk tidak memilih warga satu per satu, sedangkan paragraf kelima menunjukkan akibatnya bagi biaya.",
        },
      ],
    },
  },
};

export default item;
