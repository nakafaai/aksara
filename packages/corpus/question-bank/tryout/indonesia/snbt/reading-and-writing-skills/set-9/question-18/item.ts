import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten zeigte eine begrenzte Schlussfolgerung über Musikproberäume.",
        },
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zu folgendem Kontext: Musikproberäume.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage von den Daten kam das Team zu begrenzte Schlussfolgerung über Musikproberäume.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten zugrunde legend, wurde über Musikproberäume geschlossen das Team.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten, weil das Team eine begrenzte Schlussfolgerung über Musikproberäume.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Based on the data showed a limited conclusion about the music practice rooms.",
        },
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion for this setting (music practice rooms).",
        },
        {
          isCorrect: false,
          label:
            "Based from the data, the team reach a limited conclusion about the music practice rooms.",
        },
        {
          isCorrect: false,
          label:
            "Basing on the data, a limited conclusion was the team about the music practice rooms.",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, because the team a limited conclusion about the music practice rooms.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data menunjukkan simpulan terbatas tentang ruang latihan musik.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang ruang latihan musik.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan dari data, tim menarik simpulan terbatas tentang ruang latihan musik.",
        },
        {
          isCorrect: false,
          label:
            "Data berdasarkan, simpulan terbatas ditarik tim tentang ruang latihan musik.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, karena tim simpulan terbatas tentang ruang latihan musik.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
