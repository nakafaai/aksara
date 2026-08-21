import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Die Aussagen $$(1)$$, $$(2)$$ und $$(3)$$ sind richtig",
      value: false,
    },
    {
      label: "Die Aussagen $$(1)$$ und $$(3)$$ sind richtig",
      value: false,
    },
    {
      label: "Die Aussagen $$(2)$$ und $$(4)$$ sind richtig",
      value: true,
    },
    {
      label: "Nur Aussage $$(4)$$ ist richtig",
      value: false,
    },
    {
      label: "Alle Aussagen sind richtig",
      value: false,
    },
  ],
  en: [
    {
      label: "Statements $$(1)$$, $$(2)$$, and $$(3)$$ are correct",
      value: false,
    },
    {
      label: "Statements $$(1)$$ and $$(3)$$ are correct",
      value: false,
    },
    {
      label: "Statements $$(2)$$ and $$(4)$$ are correct",
      value: true,
    },
    {
      label: "Only statement $$(4)$$ is correct",
      value: false,
    },
    {
      label: "All statements are correct",
      value: false,
    },
  ],
  id: [
    {
      label: "Pernyataan $$(1)$$, $$(2)$$, dan $$(3)$$ benar",
      value: false,
    },
    {
      label: "Pernyataan $$(1)$$ dan $$(3)$$ benar",
      value: false,
    },
    {
      label: "Pernyataan $$(2)$$ dan $$(4)$$ benar",
      value: true,
    },
    {
      label: "Hanya pernyataan $$(4)$$ yang benar",
      value: false,
    },
    {
      label: "Semua pernyataan benar",
      value: false,
    },
  ],
};

export default choices;
