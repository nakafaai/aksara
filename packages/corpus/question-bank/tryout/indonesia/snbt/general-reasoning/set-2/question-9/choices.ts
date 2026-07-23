import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "eng no!miaw mee!ow", value: false },
    { label: "no!miaw eng mee!ow", value: false },
    { label: "eng n mee!ow o!miaw", value: false },
    { label: "no!miawi mee!ow eng", value: false },
    { label: "mee!ow no!miawi eng", value: true },
  ],
  id: [
    { label: "eng no!miaw mee!ow", value: false },
    { label: "no!miaw eng mee!ow", value: false },
    { label: "eng n mee!ow o!miaw", value: false },
    { label: "no!miawi mee!ow eng", value: false },
    { label: "mee!ow no!miawi eng", value: true },
  ],
};

export default choices;
