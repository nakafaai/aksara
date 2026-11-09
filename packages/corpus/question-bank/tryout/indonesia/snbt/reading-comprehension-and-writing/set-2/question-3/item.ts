import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "weaving-class",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat itu tidak mempunyai predikat.",
        },
        {
          correct: false,
          label:
            "Kalimat itu memakai kata yang bermakna sama secara berlebihan.",
        },
        {
          correct: true,
          label: "Kalimat itu tidak mempunyai subjek.",
        },
        {
          correct: false,
          label: "Kalimat itu memakai tanda koma yang tidak diperlukan.",
        },
        {
          correct: false,
          label: "Kalimat itu memakai kata ulang yang tidak baku.",
        },
      ],
    },
  },
};

export default item;
