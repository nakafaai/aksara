import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "survivorship-bias",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pesawat yang tertembak di mesin cenderung tidak pulang, dan alasan itu melemah jika pesawat yang jatuh ternyata juga paling banyak tertembak di badan dan sayap, bukan di mesin.",
        },
        {
          correct: false,
          label:
            "Pesawat yang tertembak di mesin cenderung tidak pulang, dan alasan itu melemah jika pesawat yang pulang jauh lebih banyak daripada yang jatuh.",
        },
        {
          correct: false,
          label:
            "Mesin adalah bagian yang paling jarang ditembak musuh, dan alasan itu melemah jika musuh ternyata mengincar mesin.",
        },
        {
          correct: false,
          label:
            "Pesawat yang tertembak di mesin cenderung tidak pulang, dan alasan itu melemah jika lubang di badan pesawat yang pulang ternyata lebih banyak lagi.",
        },
        {
          correct: false,
          label:
            "Baja di bagian mesin lebih ringan, dan alasan itu melemah jika baja untuk mesin ternyata sama beratnya dengan baja untuk badan.",
        },
      ],
    },
  },
};

export default item;
