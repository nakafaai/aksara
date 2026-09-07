import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zur Informationsstelle im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten eine begrenzte Schlussfolgerung zur Informationsstelle im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Das Team, das auf Grundlage der Daten eine begrenzte Schlussfolgerung zur Informationsstelle im Stadtpark formulierte.",
        },
        {
          isCorrect: false,
          label:
            "Weil das Team eine begrenzte Schlussfolgerung zur Informationsstelle im Stadtpark formulierte.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten formulierte über die Informationsstelle im Stadtpark.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion about the city park information desk.",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, a limited conclusion about the city park information desk.",
        },
        {
          isCorrect: false,
          label:
            "The team that reached a limited conclusion about the city park information desk based on the data.",
        },
        {
          isCorrect: false,
          label:
            "Because the team reached a limited conclusion about the city park information desk.",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, reached about the city park information desk.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, menarik tentang pusat informasi taman kota.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
