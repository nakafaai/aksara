import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The alarm sounds, and the base resistor may be at most $$10\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label: "The alarm stays silent, because the key is in the ignition",
        },
        {
          correct: false,
          label:
            "The alarm sounds, and the base resistor must be at least $$8.6\\text{ k}\\Omega$$",
        },
        {
          correct: true,
          label:
            "The alarm sounds, and the base resistor may be at most $$8.6\\text{ k}\\Omega$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penggera berbunyi, dan perintang tapak paling banyak $$10\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label: "Penggera senyap, kerana kunci berada dalam suis penghidup",
        },
        {
          correct: false,
          label:
            "Penggera berbunyi, dan perintang tapak mesti sekurang-kurangnya $$8.6\\text{ k}\\Omega$$",
        },
        {
          correct: true,
          label:
            "Penggera berbunyi, dan perintang tapak paling banyak $$8.6\\text{ k}\\Omega$$",
        },
      ],
    },
  },
};

export default item;
