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
          label: "Jika $$k=3$$, grafik $$f$$ menyinggung sumbu $$x$$.",
        },
        {
          correct: false,
          label: "Sumbu simetri grafik $$f$$ adalah garis $$x=-k$$.",
        },
        {
          correct: true,
          label:
            "Untuk setiap $$k$$ dengan $$-2<k<3$$, nilai $$f(x)$$ positif untuk setiap bilangan real $$x$$.",
        },
        {
          correct: false,
          label: "Jika $$k=-2$$, nilai minimum $$f$$ adalah $$4$$.",
        },
        {
          correct: true,
          label:
            "Jika $$k=4$$, persamaan $$f(x)=0$$ mempunyai dua akar real berbeda yang keduanya positif.",
        },
      ],
    },
  },
};

export default item;
