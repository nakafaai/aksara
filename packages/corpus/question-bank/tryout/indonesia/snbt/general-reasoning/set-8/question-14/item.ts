import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Stärkt Aussage A" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Schwächt Aussage A" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Stärkt Aussage B" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Schwächt Aussage B" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Für die Aussagen A und B irrelevant" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Strengthens statement A" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Weakens statement A" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Strengthens statement B" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Weakens statement B" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Irrelevant to statements A and B" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Memperkuat pernyataan A" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Memperlemah pernyataan A" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Memperkuat pernyataan B" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Memperlemah pernyataan B" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tidak relevan dengan pernyataan A dan B" },
          ],
        },
      ],
    },
  },
};

export default item;
