import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Umweltdegradation ist eine Verschlechterung der Umweltqualität, sodass sie sich in geschädigten Böden, verschmutztem Wasser und verschmutzter Luft sowie im Verlust biologischer Vielfalt zeigt.",
      value: false,
    },
    {
      label:
        "Umweltdegradation ist eine Verschlechterung der Umweltqualität, die sich in geschädigten Böden, verschmutztem Wasser und verschmutzter Luft sowie im Verlust biologischer Vielfalt zeigt.",
      value: true,
    },
    {
      label:
        "Umweltdegradation ist eine Verschlechterung der Umweltqualität, weil sie sich in geschädigten Böden, verschmutztem Wasser und verschmutzter Luft sowie im Verlust biologischer Vielfalt zeigt.",
      value: false,
    },
    {
      label:
        "Umweltdegradation ist eine Verschlechterung der Umweltqualität, aber sie zeigt sich in geschädigten Böden, verschmutztem Wasser und verschmutzter Luft sowie im Verlust biologischer Vielfalt.",
      value: false,
    },
    {
      label:
        "Umweltdegradation ist eine Verschlechterung der Umweltqualität und die sich in geschädigten Böden, verschmutztem Wasser und verschmutzter Luft sowie im Verlust biologischer Vielfalt zeigt.",
      value: false,
    },
  ],
};

export default choices;
