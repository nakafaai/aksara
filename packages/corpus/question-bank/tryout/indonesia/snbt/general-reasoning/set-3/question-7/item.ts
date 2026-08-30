import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Niedrigere Mindestgeldstrafen würden die Rückgewinnung staatlicher Verluste erschweren.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die milderen Bestimmungen würden die Abschreckung schwächen und die Rückgewinnung staatlicher Verluste erschweren.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Einige Bestimmungen sind milder als das Korruptionsgesetz und die Korruption in Indonesien wird zurückgehen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mehrere Bestimmungen sind milder als das Korruptionsgesetz.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die milderen Bestimmungen sollten die Abschreckung schwächen und Korruption begünstigen.",
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
          label: [
            {
              kind: "text",
              text: "Lower minimum fines would make it harder to recover state losses.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The lighter provisions would weaken deterrence and make the recovery of state losses more difficult.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Some provisions are more lenient than the Corruption Law, and corruption in Indonesia will decrease.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Several provisions are more lenient than the Corruption Law.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The lighter provisions were expected to reduce deterrence and make corruption more widespread.",
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
              text: "Penurunan denda minimum akan mempersulit pengembalian kerugian negara.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ketentuan yang lebih ringan akan mengurangi efek jera dan mempersulit pengembalian kerugian negara.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sejumlah ketentuan lebih ringan daripada UU Tipikor dan korupsi di Indonesia akan berkurang.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sejumlah ketentuan lebih ringan daripada UU Tipikor.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ketentuan yang lebih ringan diperkirakan akan mengurangi efek jera dan membuat korupsi semakin marak.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
