import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten eine begrenzte Schlussfolgerung zum Kompostierworkshop.",
        },
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zum Kompostierworkshop.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten das Team, das eine begrenzte Schlussfolgerung zum Kompostierworkshop formulierte.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten führten zu einer begrenzten Schlussfolgerung zum Kompostierworkshop, weil.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten formulierte über den Kompostierworkshop.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Based on the data, a limited conclusion about the composting workshop.",
        },
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion about the composting workshop.",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, the team that reached a limited conclusion about the composting workshop.",
        },
        {
          isCorrect: false,
          label:
            "The data led to a limited conclusion about the composting workshop because.",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, reached a limited conclusion about the composting workshop.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang lokakarya kompos.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang lokakarya kompos.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, tim yang menarik simpulan terbatas tentang lokakarya kompos.",
        },
        {
          isCorrect: false,
          label:
            "Data menghasilkan simpulan terbatas tentang lokakarya kompos karena.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, menarik simpulan terbatas tentang lokakarya kompos.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
