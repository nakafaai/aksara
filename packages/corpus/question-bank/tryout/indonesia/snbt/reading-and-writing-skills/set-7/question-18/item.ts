import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten eine begrenzte Schlussfolgerung zum Schirmverleih.",
        },
        {
          isCorrect: false,
          label:
            "Das Team, das auf Grundlage der Daten eine begrenzte Schlussfolgerung zum Schirmverleih formulierte.",
        },
        {
          isCorrect: false,
          label:
            "Weil das Team eine begrenzte Schlussfolgerung zum Schirmverleih formulierte.",
        },
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zum Schirmverleih.",
        },
        {
          isCorrect: false,
          label: "Auf Grundlage der Daten formulierte über den Schirmverleih.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Based on the data, a limited conclusion about umbrella lending.",
        },
        {
          isCorrect: false,
          label:
            "The team that reached a limited conclusion about umbrella lending based on the data.",
        },
        {
          isCorrect: false,
          label:
            "Because the team reached a limited conclusion about umbrella lending.",
        },
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion about umbrella lending.",
        },
        {
          isCorrect: false,
          label: "Based on the data, reached about umbrella lending.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang peminjaman payung.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang peminjaman payung.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang peminjaman payung.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang peminjaman payung.",
        },
        {
          isCorrect: false,
          label: "Berdasarkan data, menarik tentang peminjaman payung.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
