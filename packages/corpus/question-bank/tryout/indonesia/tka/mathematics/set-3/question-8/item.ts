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
          label: "Die Gleichung $f(x)=x$ hat zwei reelle Lösungen.",
        },
        {
          isCorrect: false,
          label: "$f^{-1}=f$.",
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
          label: "The equation $f(x)=x$ has two real solutions.",
        },
        {
          isCorrect: false,
          label: "$f^{-1}=f$.",
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
          label: "Persamaan $f(x)=x$ memiliki dua solusi real.",
        },
        {
          isCorrect: false,
          label: "$f^{-1}=f$.",
        },
      ],
    },
  },
};

export default item;
