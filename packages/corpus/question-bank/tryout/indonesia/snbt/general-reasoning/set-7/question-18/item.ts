import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Es verwendet eine andere Versiegelungsmethode als Gruppe A.",
        },
        {
          isCorrect: false,
          label: "Es besitzt alle Eigenschaften der Pakete aus Gruppe A.",
        },
        {
          isCorrect: true,
          label:
            "Es verwendet dieselbe Versiegelungsmethode wie die Pakete aus Gruppe A.",
        },
        {
          isCorrect: false,
          label:
            "Es besitzt dieselbe Seriennummer wie die Pakete aus Gruppe A.",
        },
        {
          isCorrect: false,
          label:
            "Es hat dieselben Prüfungen wie die Pakete aus Gruppe A bestanden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "It uses a different sealing method from Group A.",
        },
        {
          isCorrect: false,
          label: "It has all the same characteristics as packages in Group A.",
        },
        {
          isCorrect: true,
          label: "It uses the same sealing method as packages in Group A.",
        },
        {
          isCorrect: false,
          label: "It has the same serial number as packages in Group A.",
        },
        {
          isCorrect: false,
          label: "It passed the same inspections as packages in Group A.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Paket itu menggunakan cara penyegelan yang berbeda dari Kelompok A.",
        },
        {
          isCorrect: false,
          label:
            "Paket itu memiliki semua ciri yang sama dengan paket dalam Kelompok A.",
        },
        {
          isCorrect: true,
          label:
            "Paket itu menggunakan cara penyegelan yang sama dengan paket dalam Kelompok A.",
        },
        {
          isCorrect: false,
          label:
            "Paket itu memiliki nomor seri yang sama dengan paket dalam Kelompok A.",
        },
        {
          isCorrect: false,
          label:
            "Paket itu telah melalui pemeriksaan yang sama dengan paket dalam Kelompok A.",
        },
      ],
    },
  },
};

export default item;
