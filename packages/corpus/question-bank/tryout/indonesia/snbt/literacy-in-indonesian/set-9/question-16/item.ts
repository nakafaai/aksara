import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "water-stunting",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Membangun sarana air minum di Wonosari pasti menurunkan stunting di sana menjadi 14 persen.",
        },
        {
          correct: false,
          label:
            "Stunting di keempat desa itu sepenuhnya disebabkan oleh pendapatan yang rendah.",
        },
        {
          correct: false,
          label:
            "Desa yang dekat puskesmas selalu memiliki akses air minum yang lebih baik.",
        },
        {
          correct: false,
          label:
            "Diare berulang tidak berkaitan dengan penyerapan zat gizi pada anak.",
        },
        {
          correct: true,
          label:
            "Akses air yang baik sejalan dengan stunting yang rendah, tetapi faktor lain ikut berbeda.",
        },
      ],
    },
  },
};

export default item;
