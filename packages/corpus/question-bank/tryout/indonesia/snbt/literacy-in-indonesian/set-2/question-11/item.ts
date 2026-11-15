import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "minimum-wage",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Usul itu dapat diterima, karena kenaikan bertahap tetap menaikkan upah semua pekerja pada tahun depan.",
        },
        {
          correct: false,
          label:
            "Usul itu keliru, karena penelitian di berbagai negara membuktikan usaha mikro sama sekali tidak terdampak kenaikan upah minimum.",
        },
        {
          correct: true,
          label:
            "Usul itu menunda sebagian besar suntikan daya beli, karena menurut Teks B sebagian besar pekerja ada di usaha mikro dan kecil.",
        },
        {
          correct: false,
          label:
            "Usul itu menunda suntikan daya beli, tetapi hanya untuk sebagian kecil pekerja di kabupaten itu, sehingga pengaruhnya tidak berarti.",
        },
        {
          correct: false,
          label:
            "Usul itu tidak perlu ditanggapi, karena keberatan pengusaha selalu muncul setiap tahun tanpa bukti.",
        },
      ],
    },
  },
};

export default item;
