import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "der Ursprung des Coronavirus.",
        },
        {
          isCorrect: false,
          label:
            "Pocken sind im Vergleich zum Coronavirus eine gefährlichere Krankheit.",
        },
        {
          isCorrect: false,
          label: "die Ursache für das Verschwinden der Wikinger.",
        },
        {
          isCorrect: false,
          label: "die Ursache für das Aussterben der alten Pocken.",
        },
        {
          isCorrect: true,
          label:
            "Forschung mit alter DNA zur Geschichte und Evolution des Variola-Virus.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "the origin of the coronavirus.",
        },
        {
          isCorrect: false,
          label:
            "smallpox is a more dangerous disease compared to the coronavirus.",
        },
        {
          isCorrect: false,
          label: "the cause of the disappearance of the Vikings.",
        },
        {
          isCorrect: false,
          label: "the cause of the extinction of ancient smallpox.",
        },
        {
          isCorrect: true,
          label:
            "ancient-DNA research on the history and evolution of the variola virus.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "asal mula virus corona.",
        },
        {
          isCorrect: false,
          label:
            "cacar merupakan penyakit yang berbahaya dibandingkan virus corona.",
        },
        {
          isCorrect: false,
          label: "penyebab hilangnya orang Viking.",
        },
        {
          isCorrect: false,
          label: "penyebab punahnya cacar purba.",
        },
        {
          isCorrect: true,
          label:
            "penelitian DNA purba tentang sejarah dan evolusi virus variola.",
        },
      ],
    },
  },
};

export default item;
