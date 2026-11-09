import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "urban-heat",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Satelit mengukur suhu udara yang dirasakan orang di trotoar.",
        },
        {
          column: 1,
          label:
            "Permukaan gelap menyerap lebih banyak sinar matahari daripada permukaan terang.",
        },
        {
          column: 2,
          label:
            "Gedung tinggi yang berdempetan membantu menurunkan suhu kota karena memberi keteduhan.",
        },
        {
          column: 1,
          label: "Pendingin ruangan dapat menambah panas di luar gedung.",
        },
      ],
    },
  },
};

export default item;
