import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Satz $$(2)$$ enthält einen Zeichensetzungsfehler.",
      value: false,
    },
    {
      label:
        "Die Verbindung *Als Inselstaat, daher ...* macht Satz $$(1)$$ grammatisch fehlerhaft.",
      value: true,
    },
    {
      label: "Satz $$(3)$$ verwendet die falsche Konjunktion.",
      value: false,
    },
    {
      label: "Satz $$(4)$$ benötigt ein zusätzliches Komma.",
      value: false,
    },
    {
      label: "Satz $$(5)$$ ist unnötig weitschweifig.",
      value: false,
    },
  ],
};

export default choices;
