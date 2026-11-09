import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Untuk setiap nilai $$k$$, grafik $$f$$ melalui titik $$(-1,2)$$.",
        },
        {
          correct: false,
          label: "Grafik $$f$$ naik untuk setiap $$k>0$$.",
        },
        {
          correct: true,
          label: "Jika grafik $$f$$ sejajar garis $$y=3x+1$$, maka $$k=5$$.",
        },
        {
          correct: false,
          label: "Jika $$k=2$$, grafik $$f$$ melalui titik $$(0,0)$$.",
        },
        {
          correct: true,
          label: "Jika $$f(1)=0$$, maka $$k=1$$.",
        },
      ],
    },
  },
};

export default item;
