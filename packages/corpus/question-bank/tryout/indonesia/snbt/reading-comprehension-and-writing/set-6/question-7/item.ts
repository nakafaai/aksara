import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "larva-compost",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Walaupun ukurannya kecil, namun larva itu dapat menghabiskan tumpukan sampah yang besar dalam dua minggu.",
        },
        {
          correct: false,
          label:
            "Walaupun ukurannya kecil tetapi larva itu dapat menghabiskan tumpukan sampah yang besar dalam dua minggu.",
        },
        {
          correct: false,
          label:
            "Walaupun ukurannya kecil, sehingga larva itu dapat menghabiskan tumpukan sampah yang besar dalam dua minggu.",
        },
        {
          correct: true,
          label:
            "Walaupun ukurannya kecil, larva itu dapat menghabiskan tumpukan sampah yang besar dalam dua minggu.",
        },
        {
          correct: false,
          label:
            "Walaupun ukuran larva itu kecil, tetapi dapat menghabiskan tumpukan sampah yang besar dalam dua minggu.",
        },
      ],
    },
  },
};

export default item;
