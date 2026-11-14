import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "keroncong-origin",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "_Cavaquinho_ masih dimainkan di berbagai daerah di Portugal sampai sekarang.",
        },
        {
          correct: false,
          label:
            "Beberapa lagu lama orang Tugu ternyata memakai kata-kata dari bahasa kreol Portugis.",
        },
        {
          correct: true,
          label:
            "Naskah dari Portugal abad ke-16 menggambarkan kelompok musik yang susunan alat dan pola iringannya sama dengan keroncong.",
        },
        {
          correct: false,
          label:
            "Alat petik kecil yang mirip dengan cak dan cuk juga ditemukan di kepulauan lain yang pernah disinggahi orang Portugis.",
        },
        {
          correct: false,
          label:
            "Sebagian warga Kampung Tugu masih merayakan tradisi leluhur mereka setiap tahun.",
        },
      ],
    },
  },
};

export default item;
