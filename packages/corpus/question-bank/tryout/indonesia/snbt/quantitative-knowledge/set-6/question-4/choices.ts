import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Nur $$(1)$$, $$(2)$$ und $$(3)$$ sind richtig.",
      value: false,
    },
    {
      label: "Nur $$(1)$$ und $$(3)$$ sind richtig.",
      value: true,
    },
    {
      label: "Nur $$(2)$$ und $$(4)$$ sind richtig.",
      value: false,
    },
    {
      label: "Nur $$(4)$$ ist richtig.",
      value: false,
    },
    {
      label: "Alle Aussagen sind richtig.",
      value: false,
    },
  ],
  en: [
    { label: "Only $$(1)$$, $$(2)$$, and $$(3)$$ are correct.", value: false },
    { label: "Only $$(1)$$ and $$(3)$$ are correct.", value: true },
    { label: "Only $$(2)$$ and $$(4)$$ are correct.", value: false },
    { label: "Only $$(4)$$ is correct.", value: false },
    { label: "All statements are correct.", value: false },
  ],
  id: [
    { label: "Hanya $$(1)$$, $$(2)$$, dan $$(3)$$ yang benar.", value: false },
    { label: "Hanya $$(1)$$ dan $$(3)$$ yang benar.", value: true },
    { label: "Hanya $$(2)$$ dan $$(4)$$ yang benar.", value: false },
    { label: "Hanya $$(4)$$ yang benar.", value: false },
    { label: "Semua pernyataan benar.", value: false },
  ],
};

export default choices;
