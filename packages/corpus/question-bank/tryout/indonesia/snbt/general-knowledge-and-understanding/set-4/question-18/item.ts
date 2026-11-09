import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "puter",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Adonan akan membeku lebih cepat karena tidak ada garam yang mengganggu terbentuknya kristal es di dalam tabung.",
        },
        {
          correct: false,
          label: "Adonan akan langsung berubah menjadi serutan es.",
        },
        {
          correct: false,
          label: "Es batu tidak akan mencair sama sekali.",
        },
        {
          correct: true,
          label:
            "Adonan akan lebih sulit membeku karena es batu saja tidak sedingin campuran es dan garam.",
        },
        {
          correct: false,
          label: "Tekstur es puter pasti menjadi lebih lembut.",
        },
      ],
    },
  },
};

export default item;
