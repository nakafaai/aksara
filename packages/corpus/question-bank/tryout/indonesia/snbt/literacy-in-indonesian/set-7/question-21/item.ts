import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "rumah-gadang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kelenturan rumah gadang saat gempa berasal dari susunan tiang dan sambungannya, dan kelenturan itu bergantung pada perawatan.",
        },
        {
          correct: false,
          label:
            "Rumah gadang adalah bangunan yang tidak dapat rusak oleh gempa karena atap gonjongnya melengkung seperti tanduk kerbau.",
        },
        {
          correct: false,
          label:
            "Rumah gadang lebih penting sebagai milik kaum dalam adat matrilineal daripada sebagai bangunan.",
        },
        {
          correct: false,
          label:
            "Semua rumah gadang baru sebaiknya dibangun dengan fondasi beton agar lebih kuat menahan gempa.",
        },
        {
          correct: false,
          label:
            "Atap rumah gadang yang curam dibuat untuk mengalirkan air hujan dengan cepat dan sekaligus meredam guncangan saat gempa.",
        },
      ],
    },
  },
};

export default item;
