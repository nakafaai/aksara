import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Naturreis liefert $$7$$ kcal weniger Energie als weißer Reis",
      value: false,
    },
    {
      label: "Naturreis enthält $$1{,}2$$ g mehr Ballaststoffe als weißer Reis",
      value: false,
    },
    {
      label: "Naturreis enthält $$27$$ mg mehr Magnesium als weißer Reis",
      value: false,
    },
    {
      label:
        "Naturreis enthält $$2{,}59$$ g mehr Kohlenhydrate als weißer Reis",
      value: true,
    },
    {
      label: "Naturreis enthält $$60$$ mg mehr Phosphor als weißer Reis",
      value: false,
    },
  ],
};

export default choices;
