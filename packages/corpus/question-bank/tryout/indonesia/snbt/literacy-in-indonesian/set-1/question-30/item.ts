import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme-message",
  },
  stimulus: "salt-field",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kerja yang bergantung pada alam menuntut kesabaran, meskipun hasilnya sering tidak sebanding dengan jerih payah.",
        },
        {
          correct: false,
          label:
            "Petambak garam sebaiknya beralih ke pekerjaan lain yang lebih menguntungkan.",
        },
        {
          correct: false,
          label:
            "Hujan merupakan berkah bagi semua orang yang bekerja di ladang.",
        },
        {
          correct: false,
          label: "Anak-anak wajib membantu orang tua bekerja sejak kecil.",
        },
        {
          correct: false,
          label:
            "Pemerintah perlu mengawasi cara pedagang menimbang barang di pasar.",
        },
      ],
    },
  },
};

export default item;
