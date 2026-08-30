import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Die Anweisung $$(2)$$ ist ausreichend.",
        },
        {
          isCorrect: false,
          label: "Die Anweisung $$(1)$$ ist ausreichend.",
        },
        {
          isCorrect: false,
          label:
            "Die Anweisungen $$(1)$$ und $$(2)$$ sind ausreichend, wenn sie zusammen verwendet werden.",
        },
        {
          isCorrect: false,
          label:
            "Anweisung $$(1)$$ ist ausreichend, Anweisung $$(2)$$ ist ausreichend.",
        },
        {
          isCorrect: false,
          label: "Die Anweisungen $$(1)$$ und $$(2)$$ sind nicht ausreichend.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Statement $$(2)$$ is sufficient.",
        },
        {
          isCorrect: false,
          label: "Statement $$(1)$$ is sufficient.",
        },
        {
          isCorrect: false,
          label:
            "Statements $$(1)$$ and $$(2)$$ are sufficient if used together.",
        },
        {
          isCorrect: false,
          label:
            "Statement $$(1)$$ is sufficient, statement $$(2)$$ is sufficient.",
        },
        {
          isCorrect: false,
          label: "Statements $$(1)$$ and $$(2)$$ are not sufficient.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pernyataan $$(2)$$ cukup.",
        },
        {
          isCorrect: false,
          label: "Pernyataan $$(1)$$ cukup.",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan $$(1)$$ dan $$(2)$$ cukup jika digunakan bersama-sama.",
        },
        {
          isCorrect: false,
          label: "Pernyataan $$(1)$$ cukup, pernyataan $$(2)$$ cukup.",
        },
        {
          isCorrect: false,
          label: "Pernyataan $$(1)$$ dan $$(2)$$ tidak cukup.",
        },
      ],
    },
  },
};

export default item;
