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
            "Kedua teks menerima bahwa jumlah kantong tipis yang dibagikan supermarket berkurang sekitar $$24$$ juta lembar.",
        },
        {
          column: 2,
          label:
            "Penulis Teks B menganggap angka yang dipakai Teks A tidak benar.",
        },
        {
          column: 1,
          label:
            "Menurut angka Teks B, kantong sampah gulungan yang terjual bertambah lebih dari dua kali lipat.",
        },
        {
          column: 2,
          label:
            "Teks A memakai data dari supermarket dan pasar tradisional di Bandar Selatan.",
        },
        {
          column: 1,
          label:
            "Penulis Teks B meragukan bahwa turunnya jumlah kantong otomatis berarti turunnya berat plastik.",
        },
      ],
    },
  },
};

export default item;
