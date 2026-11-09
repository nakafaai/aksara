import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "mangrove-nursery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bibit bakau tumbuh lebih cepat karena tidak terhalang pagar.",
        },
        {
          correct: false,
          label: "Abrasi di Desa Pasir Putih langsung berhenti.",
        },
        {
          correct: true,
          label:
            "Sebagian bibit dapat hanyut tersapu ombak sebelum akarnya kuat.",
        },
        {
          correct: false,
          label:
            "Kepiting dan ikan kecil tidak mau tinggal di sela-sela akar bakau.",
        },
        {
          correct: false,
          label: "Para nelayan tidak perlu lagi menyemai buah bakau.",
        },
      ],
    },
  },
};

export default item;
