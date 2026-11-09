import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "title",
  },
  stimulus: "jamu-label",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Jamu Gendong di Indonesia",
        },
        {
          correct: true,
          label:
            "Botol Berlabel Mendekatkan Jamu Bu Sumiati kepada Pembeli Baru",
        },
        {
          correct: false,
          label: "Resep Beras Kencur Bu Sumiati",
        },
        {
          correct: false,
          label: "Pelatihan Dinas Koperasi",
        },
        {
          correct: false,
          label: "Warung di Dekat Sekolah",
        },
      ],
    },
  },
};

export default item;
