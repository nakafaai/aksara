import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "the rapid growth of internet access worldwide.", value: false },
    { label: "the replacement of teachers by digital tools.", value: false },
    {
      label: "the conditions under which technology can support education.",
      value: true,
    },
    {
      label: "the superiority of online learning over classrooms.",
      value: false,
    },
    { label: "the features of one educational device.", value: false },
  ],
};

export default choices;
