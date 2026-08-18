import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "bo ckeeck? bluwwppz", value: false },
    { label: "ckeeck? mwbluwpz bo", value: false },
    { label: "bo mwbluwpz ckeeck?", value: false },
    { label: "bo bluwpz mwckeeck?", value: true },
    { label: "mwbluwpz ckeeck? bo", value: false },
  ],
};

export default choices;
