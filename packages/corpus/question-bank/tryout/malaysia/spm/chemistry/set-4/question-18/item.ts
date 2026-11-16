import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "About 20 s, because each 10 °C rise halves the time and the water does not change the mass of sulfur needed",
        },
        {
          correct: true,
          label:
            "About 40 s, because the 10 °C rise halves the time and halving the thiosulfate concentration doubles it",
        },
        {
          correct: false,
          label:
            "About 80 s, because halving the concentration makes collisions four times less frequent",
        },
        {
          correct: false,
          label:
            "About 40 s, because the water makes the particles move more slowly, which cancels the heating",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kira-kira 20 s, kerana setiap kenaikan 10 °C menjadikan masa separuh dan air tidak mengubah jisim sulfur yang diperlukan",
        },
        {
          correct: true,
          label:
            "Kira-kira 40 s, kerana kenaikan 10 °C menjadikan masa separuh dan kepekatan tiosulfat yang separuh menggandakannya",
        },
        {
          correct: false,
          label:
            "Kira-kira 80 s, kerana kepekatan yang separuh menjadikan perlanggaran empat kali kurang kerap",
        },
        {
          correct: false,
          label:
            "Kira-kira 40 s, kerana air menjadikan zarah bergerak lebih perlahan, yang membatalkan kesan pemanasan",
        },
      ],
    },
  },
};

export default item;
