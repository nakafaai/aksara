import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "der Ursprung des Coronavirus.",
      value: false,
    },
    {
      label:
        "Pocken sind im Vergleich zum Coronavirus eine gefährlichere Krankheit.",
      value: false,
    },
    {
      label:
        "Forschung mit alter DNA zur Geschichte und Evolution des Variola-Virus.",
      value: true,
    },
    {
      label: "die Ursache für das Verschwinden der Wikinger.",
      value: false,
    },
    {
      label: "die Ursache für das Aussterben der alten Pocken.",
      value: false,
    },
  ],
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
