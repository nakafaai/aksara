import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: {
    de: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Der Definitionsbereich von $f$ enthält $x=1$ nicht.",
        },
        {
          isCorrect: true,
          label: "$f(0)=-3$.",
        },
        {
          isCorrect: true,
          label: "Der Wertebereich von $f$ enthält $y=2$ nicht.",
        },
        {
          isCorrect: true,
          label: "Die Umkehrfunktion lautet $f^{-1}(x)=\\frac{x+3}{x-2}$.",
        },
        {
          isCorrect: false,
          label: "$f(1)=0$.",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "The domain of $f$ excludes $x=1$.",
        },
        {
          isCorrect: true,
          label: "$f(0)=-3$.",
        },
        {
          isCorrect: true,
          label: "The range of $f$ excludes $y=2$.",
        },
        {
          isCorrect: true,
          label: "Its inverse is $f^{-1}(x)=\\frac{x+3}{x-2}$.",
        },
        {
          isCorrect: false,
          label: "$f(1)=0$.",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Domain $f$ mengecualikan $x=1$.",
        },
        {
          isCorrect: true,
          label: "$f(0)=-3$.",
        },
        {
          isCorrect: true,
          label: "Range $f$ mengecualikan $y=2$.",
        },
        {
          isCorrect: true,
          label: "Inversnya adalah $f^{-1}(x)=\\frac{x+3}{x-2}$.",
        },
        {
          isCorrect: false,
          label: "$f(1)=0$.",
        },
      ],
    },
  },
};

export default item;
