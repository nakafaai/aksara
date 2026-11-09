import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "gut-bacteria",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Antibiotik mengandung bakteri *C. difficile* yang ikut tertelan.",
        },
        {
          correct: false,
          label:
            "Bakteri bermanfaat berubah menjadi *C. difficile* karena antibiotik.",
        },
        {
          correct: false,
          label:
            "Serat yang tidak tercerna berubah menjadi racun di usus besar.",
        },
        {
          correct: false,
          label:
            "Tubuh mungkin berhenti membuat butirat sendiri selama pengobatan antibiotik berlangsung.",
        },
        {
          correct: true,
          label:
            "Antibiotik ikut membunuh bakteri baik, lalu ruangnya diisi bakteri merugikan.",
        },
      ],
    },
  },
};

export default item;
