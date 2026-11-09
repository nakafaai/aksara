import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "food-estate",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Teks 2 menolak setiap bentuk perbaikan irigasi sawah.",
        },
        {
          column: 1,
          label:
            "Teks 1 menyebut lonjakan harga beras dunia dapat mengguncang negara pengimpor.",
        },
        {
          column: 2,
          label:
            "Teks 1 mengusulkan agar dana dialihkan untuk mengembangkan pangan lokal.",
        },
        {
          column: 1,
          label:
            "Teks 2 menyebut sagu, jagung, dan umbi-umbian sebagai makanan di banyak daerah.",
        },
      ],
    },
  },
};

export default item;
