import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

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
      label:
        "ancient-DNA research on the history and evolution of the variola virus.",
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
      label: "penelitian DNA purba tentang sejarah dan evolusi virus variola.",
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
