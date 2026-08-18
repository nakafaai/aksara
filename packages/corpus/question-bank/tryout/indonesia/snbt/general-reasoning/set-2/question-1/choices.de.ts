import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Neue Studierende suchen nach privaten Universitäten mit umfassender Ausstattung",
      value: false,
    },
    {
      label:
        "Eine gute Dozentenqualität kann die Zahl neuer Studierender erhöhen",
      value: false,
    },
    {
      label:
        "Neue Studierende entscheiden sich für private Universitäten mit geringen Kosten",
      value: false,
    },
    {
      label:
        "Eine gute Universität verfügt über gute Dozenten und angemessene Einrichtungen",
      value: false,
    },
    {
      label:
        "Neue Studierende werden sich dennoch für eine gute Privatuniversität entscheiden, auch wenn diese teuer ist",
      value: true,
    },
  ],
};

export default choices;
