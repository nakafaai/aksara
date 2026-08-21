import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$760\\text{ Personen}$$",
      value: false,
    },
    {
      label: "$$890\\text{ Personen}$$",
      value: true,
    },
    {
      label: "$$960\\text{ Personen}$$",
      value: false,
    },
    {
      label: "$$1060\\text{ Personen}$$",
      value: false,
    },
    {
      label: "$$1160\\text{ Personen}$$",
      value: false,
    },
  ],
  en: [
    { label: "$$760\\text{ people}$$", value: false },
    { label: "$$890\\text{ people}$$", value: true },
    { label: "$$960\\text{ people}$$", value: false },
    { label: "$$1060\\text{ people}$$", value: false },
    { label: "$$1160\\text{ people}$$", value: false },
  ],
  id: [
    { label: "$$760\\text{ orang}$$", value: false },
    { label: "$$890\\text{ orang}$$", value: true },
    { label: "$$960\\text{ orang}$$", value: false },
    { label: "$$1060\\text{ orang}$$", value: false },
    { label: "$$1160\\text{ orang}$$", value: false },
  ],
};

export default choices;
