import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten zeigte eine begrenzte Schlussfolgerung über Büchertauschmarkt.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage von den Daten kam das Team zu begrenzte Schlussfolgerung über Büchertauschmarkt.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten zugrunde legend, wurde über Büchertauschmarkt geschlossen das Team.",
        },
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zu folgendem Kontext: Büchertauschmarkt.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten, weil das Team eine begrenzte Schlussfolgerung über Büchertauschmarkt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Based on the data showed a limited conclusion about the book exchange market.",
        },
        {
          isCorrect: false,
          label:
            "Based from the data, the team reach a limited conclusion about the book exchange market.",
        },
        {
          isCorrect: false,
          label:
            "Basing on the data, a limited conclusion was the team about the book exchange market.",
        },
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion for this setting (book exchange market).",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, because the team a limited conclusion about the book exchange market.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data menunjukkan simpulan terbatas tentang pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan dari data, tim menarik simpulan terbatas tentang pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Data berdasarkan, simpulan terbatas ditarik tim tentang pasar tukar buku.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, karena tim simpulan terbatas tentang pasar tukar buku.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
