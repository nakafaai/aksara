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
            "$$-57.3\\text{ kJ mol}^{-1}$$, the same as for any neutralisation",
        },
        {
          correct: true,
          label:
            "$$-52.1\\text{ kJ mol}^{-1}$$, because some of the heat is used to ionise the weak alkali completely",
        },
        {
          correct: false,
          label:
            "$$-26.0\\text{ kJ mol}^{-1}$$, because ammonia is only partly ionised",
        },
        {
          correct: false,
          label:
            "$$-52.1\\text{ kJ mol}^{-1}$$, because fewer moles of water form",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$-57.3\\text{ kJ mol}^{-1}$$, sama seperti mana-mana peneutralan",
        },
        {
          correct: true,
          label:
            "$$-52.1\\text{ kJ mol}^{-1}$$, kerana sebahagian haba digunakan untuk mengionkan alkali lemah itu sepenuhnya",
        },
        {
          correct: false,
          label:
            "$$-26.0\\text{ kJ mol}^{-1}$$, kerana ammonia hanya mengion separa",
        },
        {
          correct: false,
          label:
            "$$-52.1\\text{ kJ mol}^{-1}$$, kerana bilangan mol air yang terbentuk lebih sedikit",
        },
      ],
    },
  },
};

export default item;
