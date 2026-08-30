import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "wie Fledermäuse nachts Nahrung suchen." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "wie das Fallenlassen von einer Sitzfläche den Abflug erleichtert.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "die Vorteile des kopfüber hängenden Ruhens für Fledermäuse.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "die Orte, an denen Fledermäuse tagsüber ruhen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "wie hohe Quartiere Fledermäuse vor Raubtieren schützen können.",
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
          label: [{ kind: "text", text: "how bats search for food at night." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "how dropping from a perch helps a bat take flight.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "the advantages of upside-down roosting for bats.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "the places where bats rest during the day.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "how high roosts may help bats avoid predators.",
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
          label: [
            {
              kind: "text",
              text: "cara kelelawar mencari makan pada malam hari.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "cara menjatuhkan diri dari tempat bertengger membantu kelelawar terbang.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "keuntungan bertengger terbalik bagi kelelawar.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "tempat kelelawar beristirahat pada siang hari.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "cara tempat bertengger yang tinggi dapat melindungi kelelawar dari predator.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
