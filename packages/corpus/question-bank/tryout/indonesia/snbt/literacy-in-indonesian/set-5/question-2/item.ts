import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "wallace-line",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Sulawesi pernah tersambung dengan Kalimantan melalui daratan ketika muka laut zaman glasial turun.",
        },
        {
          column: 1,
          label:
            "Pada muka laut terendah zaman glasial, seekor harimau dapat berjalan dari Sumatra sampai ke Bali tanpa menyeberangi laut.",
        },
        {
          column: 2,
          label:
            "Anoa dan babirusa hanya hidup di Sulawesi karena hutan Sulawesi yang basah cocok bagi kedua hewan itu.",
        },
        {
          column: 1,
          label:
            "Seandainya dasar Selat Lombok ikut mengering pada zaman glasial, perbedaan mamalia darat asli Bali dan Lombok kemungkinan jauh lebih kecil.",
        },
      ],
    },
  },
};

export default item;
