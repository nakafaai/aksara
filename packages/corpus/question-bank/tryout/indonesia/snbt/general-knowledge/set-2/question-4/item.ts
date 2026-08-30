import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "die Vorteile des kopfüber hängenden Ruhens für Fledermäuse.",
        },
        {
          isCorrect: false,
          label: "wie Fledermäuse nachts Nahrung suchen.",
        },
        {
          isCorrect: false,
          label:
            "wie das Fallenlassen von einer Sitzfläche den Abflug erleichtert.",
        },
        {
          isCorrect: false,
          label: "die Orte, an denen Fledermäuse tagsüber ruhen.",
        },
        {
          isCorrect: false,
          label:
            "wie hohe Quartiere Fledermäuse vor Raubtieren schützen können.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "the advantages of upside-down roosting for bats.",
        },
        {
          isCorrect: false,
          label: "how bats search for food at night.",
        },
        {
          isCorrect: false,
          label: "how dropping from a perch helps a bat take flight.",
        },
        {
          isCorrect: false,
          label: "the places where bats rest during the day.",
        },
        {
          isCorrect: false,
          label: "how high roosts may help bats avoid predators.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "keuntungan bertengger terbalik bagi kelelawar.",
        },
        {
          isCorrect: false,
          label: "cara kelelawar mencari makan pada malam hari.",
        },
        {
          isCorrect: false,
          label:
            "cara menjatuhkan diri dari tempat bertengger membantu kelelawar terbang.",
        },
        {
          isCorrect: false,
          label: "tempat kelelawar beristirahat pada siang hari.",
        },
        {
          isCorrect: false,
          label:
            "cara tempat bertengger yang tinggi dapat melindungi kelelawar dari predator.",
        },
      ],
    },
  },
};

export default item;
