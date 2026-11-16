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
          label: "It forms a real image $$30\\text{ cm}$$ in front of the lens",
        },
        {
          correct: false,
          label: "It forms a real image $$20\\text{ cm}$$ behind the lens",
        },
        {
          correct: false,
          label: "It forms a real image $$60\\text{ cm}$$ in front of the lens",
        },
        {
          correct: true,
          label: "It leaves parallel, so no final image forms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Cahaya membentuk imej nyata $$30\\text{ cm}$$ di hadapan kanta",
        },
        {
          correct: false,
          label:
            "Cahaya membentuk imej nyata $$20\\text{ cm}$$ di belakang kanta",
        },
        {
          correct: false,
          label:
            "Cahaya membentuk imej nyata $$60\\text{ cm}$$ di hadapan kanta",
        },
        {
          correct: true,
          label: "Cahaya keluar selari, jadi tiada imej akhir terbentuk",
        },
      ],
    },
  },
};

export default item;
