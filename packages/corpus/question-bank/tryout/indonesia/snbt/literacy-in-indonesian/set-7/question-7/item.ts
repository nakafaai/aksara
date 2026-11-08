import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "walkable-city",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Menurut penulis, trotoar yang baik cukup lebar untuk dua orang berpapasan.",
        },
        {
          column: 2,
          label:
            "Penulis berpendapat kota yang ramah pejalan kaki sebaiknya melarang kendaraan pribadi.",
        },
        {
          column: 2,
          label:
            "Menurut penulis, pelebaran jalan biasanya mengatasi kemacetan untuk waktu yang lama.",
        },
        {
          column: 1,
          label:
            "Penulis menyebut bagian tersulit adalah menjaga trotoar tetap bebas dari parkir dan dagangan.",
        },
      ],
    },
  },
};

export default item;
