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
          label: "Der Mittelpunkt der Asymptoten ist $(1,2)$.",
        },
        {
          isCorrect: true,
          label:
            "$f$ ist auf jedem Intervall ihres Definitionsbereichs streng fallend.",
        },
        {
          isCorrect: true,
          label: "Aus $x>1$ folgt $f(x)>2$.",
        },
        {
          isCorrect: true,
          label: "$f^{-1}(x)=\\frac{x+3}{x-2}$.",
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
          label: "The center of the asymptotes is $(1,2)$.",
        },
        {
          isCorrect: true,
          label: "$f$ is strictly decreasing on each interval of its domain.",
        },
        {
          isCorrect: true,
          label: "If $x>1$, then $f(x)>2$.",
        },
        {
          isCorrect: true,
          label: "$f^{-1}(x)=\\frac{x+3}{x-2}$.",
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
          label: "Pusat kedua asimtot adalah $(1,2)$.",
        },
        {
          isCorrect: true,
          label: "$f$ menurun ketat pada setiap interval domainnya.",
        },
        {
          isCorrect: true,
          label: "Jika $x>1$, maka $f(x)>2$.",
        },
        {
          isCorrect: true,
          label: "$f^{-1}(x)=\\frac{x+3}{x-2}$.",
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
