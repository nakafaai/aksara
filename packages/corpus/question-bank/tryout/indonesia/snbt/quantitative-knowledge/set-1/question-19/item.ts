import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "NUR $$(1)$$, $$(2)$$ und $$(3)$$ sind wahr",
        },
        {
          isCorrect: true,
          label: "Nur $$(4)$$ ist wahr",
        },
        {
          isCorrect: false,
          label: "NUR $$(1)$$ und $$(3)$$ sind wahr",
        },
        {
          isCorrect: false,
          label: "NUR $$(2)$$ und $$(4)$$ sind wahr",
        },
        {
          isCorrect: false,
          label: "ALLE Aussagen sind wahr",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1)$$, $$(2)$$, and $$(3)$$ ONLY are true",
        },
        {
          isCorrect: true,
          label: "$$(4)$$ ONLY is true",
        },
        {
          isCorrect: false,
          label: "$$(1)$$ and $$(3)$$ ONLY are true",
        },
        {
          isCorrect: false,
          label: "$$(2)$$ and $$(4)$$ ONLY are true",
        },
        {
          isCorrect: false,
          label: "ALL statements are true",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1)$$, $$(2)$$, dan $$(3)$$ SAJA yang benar",
        },
        {
          isCorrect: true,
          label: "$$(4)$$ SAJA yang benar",
        },
        {
          isCorrect: false,
          label: "$$(1)$$ dan $$(3)$$ SAJA yang benar",
        },
        {
          isCorrect: false,
          label: "$$(2)$$ dan $$(4)$$ SAJA yang benar",
        },
        {
          isCorrect: false,
          label: "SEMUA pernyataan benar",
        },
      ],
    },
  },
};

export default item;
