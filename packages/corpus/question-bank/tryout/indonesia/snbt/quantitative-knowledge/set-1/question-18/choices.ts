import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "NUR $$(1)$$, $$(2)$$ und $$(3)$$ sind wahr",
      value: true,
    },
    {
      label: "NUR $$(1)$$ und $$(3)$$ sind wahr",
      value: false,
    },
    {
      label: "NUR $$(2)$$ und $$(4)$$ sind wahr",
      value: false,
    },
    {
      label: "ALLE Aussagen sind wahr",
      value: false,
    },
    {
      label: "ALLE Aussagen sind falsch",
      value: false,
    },
  ],
  en: [
    {
      label: "$$(1)$$, $$(2)$$, and $$(3)$$ ONLY are true",
      value: true,
    },
    {
      label: "$$(1)$$ and $$(3)$$ ONLY are true",
      value: false,
    },
    {
      label: "$$(2)$$ and $$(4)$$ ONLY are true",
      value: false,
    },
    {
      label: "ALL statements are true",
      value: false,
    },
    {
      label: "ALL statements are false",
      value: false,
    },
  ],
  id: [
    {
      label: "$$(1)$$, $$(2)$$, dan $$(3)$$ SAJA yang benar",
      value: true,
    },
    {
      label: "$$(1)$$ dan $$(3)$$ SAJA yang benar",
      value: false,
    },
    {
      label: "$$(2)$$ dan $$(4)$$ SAJA yang benar",
      value: false,
    },
    {
      label: "SEMUA pernyataan benar",
      value: false,
    },
    {
      label: "SEMUA pernyataan salah",
      value: false,
    },
  ],
};

export default choices;
