import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "concision",
  },
  stimulus: "antrean",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pada bulan ketiga, sekitar sepertiga pendaftar aplikasi justru merupakan pasien lansia yang memakai ponsel pintarnya sendiri.",
        },
        {
          correct: false,
          label: "Pada bulan ketiga, hampir sepertiga pasien lansia justru mendaftar lewat aplikasi dengan ponsel pintarnya sendiri.",
        },
        {
          correct: false,
          label: "Pada bulan ketiga, hampir sepertiga pendaftar aplikasi merupakan pasien lansia yang memakai ponsel pintarnya sendiri.",
        },
        {
          correct: false,
          label: "Pada bulan ketiga, hampir sepertiga pendaftar aplikasi justru merupakan pasien lansia yang memakai ponsel pintar.",
        },
        {
          correct: true,
          label: "Pada bulan ketiga, hampir sepertiga pendaftar aplikasi justru merupakan pasien lansia yang memakai ponsel pintarnya sendiri.",
        },
      ],
    },
  },
};

export default item;
