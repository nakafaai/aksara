import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Niedrigere Mindestgeldstrafen würden die Rückgewinnung staatlicher Verluste erschweren.",
        },
        {
          isCorrect: false,
          label:
            "Die milderen Bestimmungen würden die Abschreckung schwächen und die Rückgewinnung staatlicher Verluste erschweren.",
        },
        {
          isCorrect: true,
          label:
            "Einige Bestimmungen sind milder als das Korruptionsgesetz und die Korruption in Indonesien wird zurückgehen.",
        },
        {
          isCorrect: false,
          label: "Mehrere Bestimmungen sind milder als das Korruptionsgesetz.",
        },
        {
          isCorrect: false,
          label:
            "Die milderen Bestimmungen sollten die Abschreckung schwächen und Korruption begünstigen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Lower minimum fines would make it harder to recover state losses.",
        },
        {
          isCorrect: false,
          label:
            "The lighter provisions would weaken deterrence and make the recovery of state losses more difficult.",
        },
        {
          isCorrect: true,
          label:
            "Some provisions are more lenient than the Corruption Law, and corruption in Indonesia will decrease.",
        },
        {
          isCorrect: false,
          label: "Several provisions are more lenient than the Corruption Law.",
        },
        {
          isCorrect: false,
          label:
            "The lighter provisions were expected to reduce deterrence and make corruption more widespread.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Penurunan denda minimum akan mempersulit pengembalian kerugian negara.",
        },
        {
          isCorrect: false,
          label:
            "Ketentuan yang lebih ringan akan mengurangi efek jera dan mempersulit pengembalian kerugian negara.",
        },
        {
          isCorrect: true,
          label:
            "Sejumlah ketentuan lebih ringan daripada UU Tipikor dan korupsi di Indonesia akan berkurang.",
        },
        {
          isCorrect: false,
          label: "Sejumlah ketentuan lebih ringan daripada UU Tipikor.",
        },
        {
          isCorrect: false,
          label:
            "Ketentuan yang lebih ringan diperkirakan akan mengurangi efek jera dan membuat korupsi semakin marak.",
        },
      ],
    },
  },
};

export default item;
