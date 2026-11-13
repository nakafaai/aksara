import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Daerah asal $$f\\circ g$$ adalah himpunan semua bilangan real $$x\\ge0$$.",
        },
        {
          correct: false,
          label: "Nilai minimum $$g\\circ f$$ adalah $$-4$$.",
        },
        {
          correct: false,
          label: "Grafik $$y=(f\\circ g)(x)$$ memotong sumbu $$y$$.",
        },
        {
          correct: false,
          label: "Nilai minimum $$f\\circ g$$ dicapai pada $$x=3$$.",
        },
        {
          correct: true,
          label: "Nilai minimum $$f\\circ g$$ adalah $$-4$$.",
        },
      ],
    },
  },
};

export default item;
