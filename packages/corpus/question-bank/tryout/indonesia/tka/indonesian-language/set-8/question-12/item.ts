import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "blood-drive",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "kalimat itu tepat karena 132 kantong darah berhasil dikumpulkan",
        },
        {
          correct: false,
          label:
            "kalimat itu tepat karena setiap pendaftar diperiksa sebelum donor",
        },
        {
          correct: true,
          label:
            "kalimat itu tidak didukung data karena pemeriksaan hanya menilai keamanan donor pada hari itu dan 54 pendaftar tidak lolos",
        },
        {
          correct: false,
          label:
            "kalimat itu salah karena tidak ada satu pun pendaftar yang lolos pemeriksaan",
        },
        {
          correct: false,
          label:
            "kalimat itu tidak relevan karena guru dan orang tua juga ikut mendonorkan darah",
        },
      ],
    },
  },
};

export default item;
