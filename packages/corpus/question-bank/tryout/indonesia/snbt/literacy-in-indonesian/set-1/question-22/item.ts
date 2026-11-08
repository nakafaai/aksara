import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "kawi-script",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Raja-raja Jawa melarang penggunaan aksara Pallawa pada prasasti.",
        },
        {
          correct: true,
          label:
            "Bunyi dan susunan kata bahasa Jawa Kuno berbeda dari bahasa Sanskerta.",
        },
        {
          correct: false,
          label:
            "Garis yang membulat lebih mudah digoreskan pada daun lontar daripada garis yang bersudut.",
        },
        {
          correct: false,
          label:
            "Pendeta dan pedagang dari India selatan berhenti datang ke Nusantara.",
        },
        {
          correct: false,
          label:
            "Aksara itu perlu disederhanakan agar dapat dipakai di Filipina.",
        },
      ],
    },
  },
};

export default item;
