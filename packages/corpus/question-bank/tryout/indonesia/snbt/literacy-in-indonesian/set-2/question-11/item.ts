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
            "Usul itu menunda sebagian besar suntikan daya beli, karena menurut Teks A pekerja usaha mikro membelanjakan upahnya di luar kabupaten.",
        },
        {
          correct: false,
          label:
            "Usul itu menunda suntikan daya beli, tetapi hanya bagi pekerja pabrik, karena menurut Teks B pabrik menyerap sebagian besar pekerja di Sukaraja.",
        },
        {
          correct: true,
          label:
            "Usul itu menunda sebagian besar suntikan daya beli, karena menurut Teks B sebagian besar pekerja di Sukaraja bekerja di usaha mikro dan kecil.",
        },
        {
          correct: false,
          label:
            "Usul itu menunda sebagian besar suntikan daya beli, sehingga penjualan di pasar tradisional pasti turun seperti yang terjadi pada 2022.",
        },
        {
          correct: false,
          label:
            "Usul itu menunda suntikan daya beli, tetapi tidak berarti, karena kenaikan upah yang tidak terlalu besar umumnya tidak banyak mengurangi lapangan kerja.",
        },
      ],
    },
  },
};

export default item;
