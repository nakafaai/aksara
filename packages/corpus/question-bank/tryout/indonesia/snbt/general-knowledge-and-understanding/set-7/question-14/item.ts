import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "figurative-meaning",
  },
  stimulus: "panas",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "masalah itu selalu terjadi pada bulan yang sama setiap tahun",
        },
        {
          correct: false,
          label:
            "warga kota berjalan berkeliling untuk mencari tempat yang sejuk",
        },
        {
          correct: false,
          label: "listrik dibagikan secara merata ke seluruh bagian kota",
        },
        {
          correct: true,
          label:
            "akibat dari masalah itu justru memperbesar penyebabnya sendiri",
        },
        {
          correct: false,
          label: "masalah itu dapat diselesaikan dengan cepat dan mudah",
        },
      ],
    },
  },
};

export default item;
