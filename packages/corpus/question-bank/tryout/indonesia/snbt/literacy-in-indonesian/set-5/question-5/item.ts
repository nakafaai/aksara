import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "wallace-line",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Selat Sunda lebih dalam daripada Selat Lombok sehingga keduanya layak dibandingkan.",
        },
        {
          correct: true,
          label: "Selat Sunda tidak jauh lebih sempit daripada Selat Lombok.",
        },
        {
          correct: false,
          label:
            "Harimau dan badak di Sumatra dan di Jawa termasuk jenis yang persis sama.",
        },
        {
          correct: false,
          label:
            "Mamalia darat sama sekali tidak mampu berenang menyeberangi sebuah selat.",
        },
        {
          correct: false,
          label:
            "Muka laut di sekitar Selat Sunda turun lebih jauh daripada di sekitar Selat Lombok.",
        },
      ],
    },
  },
};

export default item;
