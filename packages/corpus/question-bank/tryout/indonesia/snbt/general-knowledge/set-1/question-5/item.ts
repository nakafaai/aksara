import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "der Ursprung des Coronavirus." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pocken sind im Vergleich zum Coronavirus eine gefährlichere Krankheit.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Forschung mit alter DNA zur Geschichte und Evolution des Variola-Virus.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "die Ursache für das Verschwinden der Wikinger.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "die Ursache für das Aussterben der alten Pocken.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "the origin of the coronavirus." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "smallpox is a more dangerous disease compared to the coronavirus.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "ancient-DNA research on the history and evolution of the variola virus.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "the cause of the disappearance of the Vikings.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "the cause of the extinction of ancient smallpox.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "asal mula virus corona." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "cacar merupakan penyakit yang berbahaya dibandingkan virus corona.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "penelitian DNA purba tentang sejarah dan evolusi virus variola.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "penyebab hilangnya orang Viking." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "penyebab punahnya cacar purba." }],
        },
      ],
    },
  },
};

export default item;
