import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The image changes from virtual and upright to real and inverted, and its magnification falls from 3 times to 1.5 times",
        },
        {
          correct: false,
          label:
            "The image stays virtual and upright, and its magnification increases",
        },
        {
          correct: true,
          label:
            "The image changes from virtual and upright to real and inverted, and its magnification stays at 3 times",
        },
        {
          correct: false,
          label:
            "The image changes from virtual and upright to real and inverted, and its magnification rises from 3 times to 6 times",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Imej berubah daripada maya dan tegak kepada nyata dan songsang, dan pembesarannya berkurang daripada 3 kali kepada 1.5 kali",
        },
        {
          correct: false,
          label: "Imej kekal maya dan tegak, dan pembesarannya bertambah",
        },
        {
          correct: true,
          label:
            "Imej berubah daripada maya dan tegak kepada nyata dan songsang, dan pembesarannya kekal 3 kali",
        },
        {
          correct: false,
          label:
            "Imej berubah daripada maya dan tegak kepada nyata dan songsang, dan pembesarannya bertambah daripada 3 kali kepada 6 kali",
        },
      ],
    },
  },
};

export default item;
