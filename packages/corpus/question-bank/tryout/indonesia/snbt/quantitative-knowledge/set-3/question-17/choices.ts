import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
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
