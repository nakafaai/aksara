import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "About 2680 kJ mol⁻¹, because pentanol and butanol release the same heat per mole",
        },
        {
          correct: false,
          label:
            "About 3330 kJ mol⁻¹, and an experiment with a copper can gives a larger value because the can absorbs heat",
        },
        {
          correct: true,
          label:
            "About 3330 kJ mol⁻¹, and an experiment with a copper can gives a smaller value because heat escapes to the surroundings",
        },
        {
          correct: false,
          label:
            "About 4000 kJ mol⁻¹, because the heat of combustion grows faster with each extra carbon atom",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kira-kira 2680 kJ mol⁻¹, kerana pentanol dan butanol membebaskan haba yang sama per mol",
        },
        {
          correct: false,
          label:
            "Kira-kira 3330 kJ mol⁻¹, dan eksperimen dengan bekas kuprum memberikan nilai lebih besar kerana bekas menyerap haba",
        },
        {
          correct: true,
          label:
            "Kira-kira 3330 kJ mol⁻¹, dan eksperimen dengan bekas kuprum memberikan nilai lebih kecil kerana haba terbebas ke persekitaran",
        },
        {
          correct: false,
          label:
            "Kira-kira 4000 kJ mol⁻¹, kerana haba pembakaran bertambah lebih cepat bagi setiap atom karbon tambahan",
        },
      ],
    },
  },
};

export default item;
