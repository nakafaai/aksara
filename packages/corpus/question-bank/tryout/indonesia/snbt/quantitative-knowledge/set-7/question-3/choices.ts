import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$(1)$$, $$(2)$$ und $$(3)$$",
      value: false,
    },
    {
      label: "$$(1)$$ und $$(3)$$",
      value: true,
    },
    {
      label: "$$(2)$$ und $$(4)$$",
      value: false,
    },
    {
      label: "Nur $$(4)$$",
      value: false,
    },
    {
      label: "Alle vier Zahlen",
      value: false,
    },
  ],
  en: [
    { label: "$$(1)$$, $$(2)$$, and $$(3)$$", value: false },
    { label: "$$(1)$$ and $$(3)$$", value: true },
    { label: "$$(2)$$ and $$(4)$$", value: false },
    { label: "Only $$(4)$$", value: false },
    { label: "All four numbers", value: false },
  ],
  id: [
    { label: "$$(1)$$, $$(2)$$, dan $$(3)$$", value: false },
    { label: "$$(1)$$ dan $$(3)$$", value: true },
    { label: "$$(2)$$ dan $$(4)$$", value: false },
    { label: "Hanya $$(4)$$", value: false },
    { label: "Keempat bilangan", value: false },
  ],
};

export default choices;
