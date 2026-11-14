import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "keroncong-origin",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kelompok itu memainkan bentuk keroncong yang paling tua.",
        },
        {
          correct: false,
          label:
            "Kelompok itu pasti berasal dari Kampung Tugu atau belajar dari pemusik Tugu.",
        },
        {
          correct: false,
          label:
            "Kelompok itu tidak memakai alat tambahan seperti biola dan selo.",
        },
        {
          correct: true,
          label:
            "Kelompok itu mengikuti pakem yang mengeras pada abad ke-20, dan musiknya belum tentu mirip dengan musik orang Tugu.",
        },
        {
          correct: false,
          label:
            "Kelompok itu menolak bentuk stambul dan langgam karena dianggap tidak asli.",
        },
      ],
    },
  },
};

export default item;
