import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$10{,}000$$ votes", value: false },
    { label: "$$30{,}000$$ votes", value: false },
    { label: "$$50{,}000$$ votes", value: false },
    { label: "$$60{,}000$$ votes", value: true },
    { label: "$$80{,}000$$ votes", value: false },
  ],
  id: [
    { label: "$$10{.}000$$ suara", value: false },
    { label: "$$30{.}000$$ suara", value: false },
    { label: "$$50{.}000$$ suara", value: false },
    { label: "$$60{.}000$$ suara", value: true },
    { label: "$$80{.}000$$ suara", value: false },
  ],
};

export default choices;
