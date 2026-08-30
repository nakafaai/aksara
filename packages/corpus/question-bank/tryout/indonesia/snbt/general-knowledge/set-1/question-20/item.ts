import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Entwicklungsinvestitionen als Element der Katastrophenvorsorge.",
        },
        {
          isCorrect: false,
          label:
            "die Notwendigkeit einer Katastrophenfrühwarnung zur Risikominderung.",
        },
        {
          isCorrect: false,
          label:
            "die Notwendigkeit einer strengen Überwachung der Bauunternehmer.",
        },
        {
          isCorrect: false,
          label:
            "die große Anzahl von Gebäuden in katastrophengefährdeten Gebieten.",
        },
        {
          isCorrect: false,
          label: "Entwicklungsinvestitionen in humanitäre Verwundbarkeit.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "development investment as an element of disaster mitigation.",
        },
        {
          isCorrect: false,
          label: "the need for disaster early warning for risk reduction.",
        },
        {
          isCorrect: false,
          label: "the need for strict supervision of building contractors.",
        },
        {
          isCorrect: false,
          label:
            "the large number of buildings located in disaster-prone areas.",
        },
        {
          isCorrect: false,
          label: "development investment in humanitarian vulnerability.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "investasi pembangunan sebagai elemen mitigasi bencana.",
        },
        {
          isCorrect: false,
          label: "perlunya peringatan dini bencana guna pengurangan risiko.",
        },
        {
          isCorrect: false,
          label: "perlunya pengawasan ketat terhadap kontraktor bangunan.",
        },
        {
          isCorrect: false,
          label: "banyaknya bangunan yang berada di daerah rawan bencana.",
        },
        {
          isCorrect: false,
          label: "investasi pembangunan dalam kerentanan kemanusiaan.",
        },
      ],
    },
  },
};

export default item;
