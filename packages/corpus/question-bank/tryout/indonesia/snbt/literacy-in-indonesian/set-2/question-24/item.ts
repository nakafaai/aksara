import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "subak-water",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Varietas unggul yang ditanam petani lebih disukai wereng daripada varietas lama.",
        },
        {
          correct: false,
          label:
            "Pura air berhenti mengadakan upacara sehingga petani kehilangan pemimpin.",
        },
        {
          correct: false,
          label:
            "Air dari pegunungan dialihkan ke hotel dan vila sehingga sawah mengering.",
        },
        {
          correct: true,
          label:
            "Tanpa jadwal serentak, hama tidak lagi kehilangan makanan di wilayah yang luas.",
        },
        {
          correct: false,
          label:
            "Subak di hilir mulai menanam lebih dulu daripada subak di hulu.",
        },
      ],
    },
  },
};

export default item;
