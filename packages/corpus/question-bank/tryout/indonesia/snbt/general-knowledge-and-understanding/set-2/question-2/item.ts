import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "affix-meaning",
  },
  stimulus: "delta",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Hingga air surut, warga masih bertahan di *pengungsian*.",
        },
        {
          correct: false,
          label:
            "*Pendapatan* dari panen kali ini cukup untuk membeli bibit baru.",
        },
        {
          correct: false,
          label:
            "Sejak subuh, perahu nelayan sudah merapat di *pendaratan* ikan.",
        },
        {
          correct: false,
          label: "Kain tenun itu *pemberian* neneknya sebelum ia merantau.",
        },
        {
          correct: true,
          label:
            "*Penyeberangan* ke pulau itu dihentikan selama gelombang tinggi.",
        },
      ],
    },
  },
};

export default item;
