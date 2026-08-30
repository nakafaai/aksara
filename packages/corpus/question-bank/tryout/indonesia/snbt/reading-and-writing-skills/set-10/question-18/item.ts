import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zu folgendem Kontext: Informationsstelle im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten zeigte eine begrenzte Schlussfolgerung über Informationsstelle im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage von den Daten kam das Team zu begrenzte Schlussfolgerung über Informationsstelle im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten zugrunde legend, wurde über Informationsstelle im Stadtpark geschlossen das Team.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten, weil das Team eine begrenzte Schlussfolgerung über Informationsstelle im Stadtpark.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion for this setting (city park information desk).",
        },
        {
          isCorrect: false,
          label:
            "Based on the data showed a limited conclusion about the city park information desk.",
        },
        {
          isCorrect: false,
          label:
            "Based from the data, the team reach a limited conclusion about the city park information desk.",
        },
        {
          isCorrect: false,
          label:
            "Basing on the data, a limited conclusion was the team about the city park information desk.",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, because the team a limited conclusion about the city park information desk.",
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
            "Berdasarkan data menunjukkan simpulan terbatas tentang pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan dari data, tim menarik simpulan terbatas tentang pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Data berdasarkan, simpulan terbatas ditarik tim tentang pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, karena tim simpulan terbatas tentang pusat informasi taman kota.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
