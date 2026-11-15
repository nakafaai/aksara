import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "plastic-levy",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Menurut kajian 2011, tas katun yang dipakai $$50$$ kali masih berdampak pemanasan global lebih besar daripada $$50$$ kantong tipis sekali pakai yang digantikannya.",
        },
        {
          column: 2,
          label:
            "Menurut kajian 2011, tas katun selalu lebih buruk bagi lingkungan daripada kantong plastik tipis.",
        },
        {
          column: 1,
          label:
            "Kajian 2011 tidak dapat dipakai untuk menilai seberapa banyak kantong plastik yang mencemari laut.",
        },
        {
          column: 2,
          label:
            "Penulis Teks B menyimpulkan bahwa cukai kantong plastik sebaiknya dihapus.",
        },
        {
          column: 2,
          label:
            "Menurut kajian 2011, tas katun yang dipakai $$200$$ kali berdampak pemanasan global lebih besar daripada $$200$$ kantong tipis sekali pakai.",
        },
      ],
    },
  },
};

export default item;
