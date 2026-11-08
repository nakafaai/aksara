import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "antibiotic-resistance",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menunda pengobatan infeksi sampai antibiotik golongan baru tersedia.",
        },
        {
          correct: false,
          label:
            "Memberikan antibiotik dalam takaran rendah kepada semua hewan ternak.",
        },
        {
          correct: false,
          label:
            "Meminum antibiotik setiap kali terkena pilek agar tidak menjadi parah.",
        },
        {
          correct: true,
          label:
            "Berhenti memakai antibiotik untuk penyakit virus dan pemacu pertumbuhan ternak.",
        },
        {
          correct: false,
          label:
            "Menyimpan semua antibiotik sebagai cadangan dan tidak memakainya sama sekali.",
        },
      ],
    },
  },
};

export default item;
