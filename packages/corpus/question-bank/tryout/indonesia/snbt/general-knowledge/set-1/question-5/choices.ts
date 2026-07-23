import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "the origin of the coronavirus.",
      value: false,
    },
    {
      label:
        "smallpox is a more dangerous disease compared to the coronavirus.",
      value: false,
    },
    {
      label: "research on the origin of the smallpox virus.",
      value: true,
    },
    {
      label: "the cause of the disappearance of the Vikings.",
      value: false,
    },
    {
      label: "the cause of the extinction of ancient smallpox.",
      value: false,
    },
  ],
  id: [
    {
      label: "asal mula virus corona.",
      value: false,
    },
    {
      label:
        "cacar merupakan penyakit yang berbahaya dibandingkan virus corona.",
      value: false,
    },
    {
      label: "penelitian asal mula virus cacar.",
      value: true,
    },
    {
      label: "penyebab hilangnya orang Viking.",
      value: false,
    },
    {
      label: "penyebab punahnya cacar purba.",
      value: false,
    },
  ],
};

export default choices;
