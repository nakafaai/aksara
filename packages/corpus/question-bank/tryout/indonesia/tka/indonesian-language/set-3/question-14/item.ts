import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  versions: {
    id: {
      columns: ["Data utama pada tabel", "Penjelasan alternatif"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "438 liter air pada minggu ketiga",
        },
        {
          column: 2,
          label: "Kantin berhenti menjual satu merek air kemasan",
        },
        {
          column: 2,
          label: "Suhu udara meningkat",
        },
      ],
    },
  },
  stimulus: "refill-station",
};

export default item;
