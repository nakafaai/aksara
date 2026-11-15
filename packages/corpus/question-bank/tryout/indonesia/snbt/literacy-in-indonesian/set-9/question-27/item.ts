import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "survivorship-bias",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika pesawat yang tertembak di mesin ternyata tetap dapat pulang, saran Wald kehilangan dasarnya.",
        },
        {
          column: 2,
          label:
            "Selama pertempuran, mesin pesawat jarang terkena tembakan musuh.",
        },
        {
          column: 1,
          label:
            "Catatan para perwira adalah contoh data yang sudah melewati suatu penyaringan.",
        },
        {
          column: 2,
          label:
            "Menurut Wald, baja sebaiknya dipasang merata di seluruh badan pesawat.",
        },
        {
          column: 2,
          label:
            "Teks menyatakan bahwa pola lubang dalam contoh itu adalah catatan sebenarnya dari Perang Dunia II.",
        },
      ],
    },
  },
};

export default item;
