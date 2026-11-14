import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "clinic-queue",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "cara itu sudah akurat karena datanya diambil langsung dari aplikasi",
        },
        {
          correct: false,
          label:
            "cara itu membuat waktu tunggu pasien lansia tampak lebih lama daripada kenyataan",
        },
        {
          correct: false,
          label:
            "cara itu tidak perlu diubah karena keluhan sudah ditangani dengan loket khusus",
        },
        {
          correct: false,
          label:
            "cara itu membuktikan bahwa waktu tunggu sebenarnya justru naik",
        },
        {
          correct: true,
          label:
            "cara itu kurang tepat karena tidak mencatat kapan pasien benar-benar tiba di puskesmas",
        },
      ],
    },
  },
};

export default item;
