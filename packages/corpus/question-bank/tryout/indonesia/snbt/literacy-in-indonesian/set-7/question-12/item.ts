import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
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
            "Kedua teks sepakat bahwa jumlah kantong tipis yang dibagikan supermarket turun tajam.",
        },
        {
          column: 2,
          label:
            "Penulis Teks B menganggap angka yang dipakai Teks A tidak benar.",
        },
        {
          column: 1,
          label:
            "Penulis Teks B meragukan bahwa turunnya jumlah kantong otomatis berarti turunnya plastik yang dipakai.",
        },
        {
          column: 2,
          label:
            "Teks A memakai data dari supermarket dan pasar tradisional di Bandar Selatan.",
        },
      ],
    },
  },
};

export default item;
