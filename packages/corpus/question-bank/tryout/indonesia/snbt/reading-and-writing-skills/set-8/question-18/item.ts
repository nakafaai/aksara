import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zum Fundbüro.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten eine begrenzte Schlussfolgerung zum Fundbüro.",
        },
        {
          isCorrect: false,
          label:
            "Das Team, das auf Grundlage der Daten eine begrenzte Schlussfolgerung zum Fundbüro formulierte.",
        },
        {
          isCorrect: false,
          label:
            "Weil das Team eine begrenzte Schlussfolgerung zum Fundbüro formulierte.",
        },
        {
          isCorrect: false,
          label: "Auf Grundlage der Daten formulierte über das Fundbüro.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion about the lost-property service.",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, a limited conclusion about the lost-property service.",
        },
        {
          isCorrect: false,
          label:
            "The team that reached a limited conclusion about the lost-property service based on the data.",
        },
        {
          isCorrect: false,
          label:
            "Because the team reached a limited conclusion about the lost-property service.",
        },
        {
          isCorrect: false,
          label: "Based on the data, reached about the lost-property service.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang layanan barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang layanan barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang layanan barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang layanan barang hilang.",
        },
        {
          isCorrect: false,
          label: "Berdasarkan data, menarik tentang layanan barang hilang.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
