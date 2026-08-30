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
              text: "Geschützte Lebensräume müssen vor Baubeginn kartiert werden.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ein Planungsabschnitt durch einen geschützten Lebensraum muss verlegt werden.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die ursprüngliche Brückentrasse darf während des Baus unverändert bleiben.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die ursprüngliche Brückentrasse durchquerte einen geschützten Nashornvogel-Lebensraum.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Das Team verlegte die Brückentrasse vor Baubeginn.",
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
              text: "Protected habitats must be mapped before construction begins.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A design segment crossing a protected habitat must be relocated.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The original bridge alignment may remain unchanged through construction.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The original bridge alignment crossed a protected hornbill habitat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The team relocated the bridge alignment before construction.",
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
              text: "Habitat yang dilindungi harus dipetakan sebelum konstruksi dimulai.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bagian rancangan yang melintasi habitat yang dilindungi harus dipindahkan.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Jalur jembatan semula boleh tetap digunakan tanpa perubahan selama konstruksi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jalur jembatan semula melintasi habitat rangkong yang dilindungi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tim memindahkan jalur jembatan sebelum konstruksi.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
