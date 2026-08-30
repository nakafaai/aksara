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
          label: [{ kind: "text", text: "Ist für beide Aussagen irrelevant" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Strengthens Statement A" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Weakens Statement A" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Strengthens Statement B" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Weakens Statement B" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Is irrelevant to both statements" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Memperkuat Pernyataan A" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Memperlemah Pernyataan A" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Memperkuat Pernyataan B" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Memperlemah Pernyataan B" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tidak relevan dengan kedua pernyataan" },
          ],
        },
      ],
    },
  },
};

export default item;
