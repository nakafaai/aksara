import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten eine begrenzte Schlussfolgerung zum Büchertauschmarkt.",
        },
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zum Büchertauschmarkt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team, das auf Grundlage der Daten eine begrenzte Schlussfolgerung zum Büchertauschmarkt formulierte.",
        },
        {
          isCorrect: false,
          label:
            "Weil das Team eine begrenzte Schlussfolgerung zum Büchertauschmarkt formulierte.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten formulierte über den Büchertauschmarkt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Based on the data, a limited conclusion about the book exchange.",
        },
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion about the book exchange.",
        },
        {
          isCorrect: false,
          label:
            "The team that reached a limited conclusion about the book exchange based on the data.",
        },
        {
          isCorrect: false,
          label:
            "Because the team reached a limited conclusion about the book exchange.",
        },
        {
          isCorrect: false,
          label: "Based on the data, reached about the book exchange.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang pasar tukar buku.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang pasar tukar buku.",
        },
        {
          isCorrect: false,
          label: "Berdasarkan data, menarik tentang pasar tukar buku.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
