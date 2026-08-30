import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die ursprüngliche Brückentrasse darf während des Baus unverändert bleiben.",
        },
        {
          isCorrect: false,
          label: "Geschützte Lebensräume müssen vor Baubeginn kartiert werden.",
        },
        {
          isCorrect: false,
          label:
            "Ein Planungsabschnitt durch einen geschützten Lebensraum muss verlegt werden.",
        },
        {
          isCorrect: false,
          label:
            "Die ursprüngliche Brückentrasse durchquerte einen geschützten Nashornvogel-Lebensraum.",
        },
        {
          isCorrect: false,
          label: "Das Team verlegte die Brückentrasse vor Baubeginn.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The original bridge alignment may remain unchanged through construction.",
        },
        {
          isCorrect: false,
          label:
            "Protected habitats must be mapped before construction begins.",
        },
        {
          isCorrect: false,
          label:
            "A design segment crossing a protected habitat must be relocated.",
        },
        {
          isCorrect: false,
          label:
            "The original bridge alignment crossed a protected hornbill habitat.",
        },
        {
          isCorrect: false,
          label: "The team relocated the bridge alignment before construction.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Jalur jembatan semula boleh tetap digunakan tanpa perubahan selama konstruksi.",
        },
        {
          isCorrect: false,
          label:
            "Habitat yang dilindungi harus dipetakan sebelum konstruksi dimulai.",
        },
        {
          isCorrect: false,
          label:
            "Bagian rancangan yang melintasi habitat yang dilindungi harus dipindahkan.",
        },
        {
          isCorrect: false,
          label:
            "Jalur jembatan semula melintasi habitat rangkong yang dilindungi.",
        },
        {
          isCorrect: false,
          label: "Tim memindahkan jalur jembatan sebelum konstruksi.",
        },
      ],
    },
  },
};

export default item;
