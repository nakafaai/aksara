import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "sleep-memory",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Setiap aroma yang dialirkan selama tidur akan memperbaiki ingatan peserta.",
        },
        {
          column: 1,
          label:
            "Aroma mawar tidak memperbaiki ingatan jika diberikan ketika peserta terjaga.",
        },
        {
          column: 1,
          label:
            "Percobaan ini mendukung gagasan bahwa ingatan diolah ulang selama tidur gelombang lambat.",
        },
        {
          column: 2,
          label:
            "Peserta yang menerima aroma selama tidur REM mengingat letak kartu lebih baik daripada peserta yang menerima aroma selama tidur gelombang lambat.",
        },
      ],
    },
  },
};

export default item;
