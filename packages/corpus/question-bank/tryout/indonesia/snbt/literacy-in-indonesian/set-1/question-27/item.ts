import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "bystander-effect",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pemberitaan awal tentang kasus 1964 melebih-lebihkan banyaknya orang yang menyaksikan serangan tanpa berbuat apa pun.",
        },
        {
          column: 1,
          label:
            "Dalam percobaan 1968, peserta yang mengira ada empat pendengar lain lebih jarang mencari bantuan sebelum suara kejang berhenti.",
        },
        {
          column: 2,
          label:
            "Rekaman kamera pengawas membuktikan bahwa efek penonton tidak pernah terjadi di tempat umum.",
        },
        {
          column: 1,
          label:
            "Meta-analisis 2011 menemukan bahwa efek penonton lebih lemah dalam keadaan yang jelas berbahaya.",
        },
        {
          column: 2,
          label:
            "Dalam rekaman kamera pengawas, makin banyak orang di sekitar kejadian, makin kecil peluang setiap orang untuk menolong.",
        },
      ],
    },
  },
};

export default item;
