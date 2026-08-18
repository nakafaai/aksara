import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Who invented the first electronic computer?", value: false },
    { label: "Which country has the cheapest office rent?", value: false },
    { label: "How can every human task be removed immediately?", value: false },
    { label: "Why should all workers avoid digital tools?", value: false },
    {
      label:
        "How could GenAI transform occupational tasks, and what factors shape the outcome?",
      value: true,
    },
  ],
};

export default choices;
