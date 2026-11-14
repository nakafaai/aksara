import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "loud-exhaust",
  versions: {
    id: {
      columns: ["Dampak kebisingan", "Hasil pengukuran", "Kesepakatan warga"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Suara keras yang terus-menerus dapat mengganggu tidur.",
        },
        {
          column: 2,
          label:
            "Sebanyak 18 dari 80 sepeda motor menghasilkan suara di atas 90 dB.",
        },
        { column: 3, label: "Spanduk imbauan dipasang di ujung jalan." },
        { column: 1, label: "Kebisingan menyulitkan konsentrasi." },
      ],
    },
  },
};

export default item;
