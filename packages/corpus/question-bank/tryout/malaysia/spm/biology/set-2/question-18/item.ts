import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "nutrition-and-the-human-digestive-system",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1\\,000\\,000$$ times" },
        { correct: false, label: "$$10\\,000$$ times" },
        { correct: true, label: "$$100$$ times" },
        {
          correct: false,
          label:
            "It stays the same, because the total volume of fat does not change",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1\\,000\\,000$$ kali" },
        { correct: false, label: "$$10\\,000$$ kali" },
        { correct: true, label: "$$100$$ kali" },
        {
          correct: false,
          label: "Tidak berubah, kerana jumlah isi padu lemak tidak berubah",
        },
      ],
    },
  },
};

export default item;
