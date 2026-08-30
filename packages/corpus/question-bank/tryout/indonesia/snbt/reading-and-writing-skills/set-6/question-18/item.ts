import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zu folgendem Kontext: Lärmprotokoll im Wohngebiet.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten zeigte eine begrenzte Schlussfolgerung über Lärmprotokoll im Wohngebiet.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage von den Daten kam das Team zu begrenzte Schlussfolgerung über Lärmprotokoll im Wohngebiet.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten zugrunde legend, wurde über Lärmprotokoll im Wohngebiet geschlossen das Team.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten, weil das Team eine begrenzte Schlussfolgerung über Lärmprotokoll im Wohngebiet.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion for this setting (neighbourhood noise log).",
        },
        {
          isCorrect: false,
          label:
            "Based on the data showed a limited conclusion about the neighbourhood noise log.",
        },
        {
          isCorrect: false,
          label:
            "Based from the data, the team reach a limited conclusion about the neighbourhood noise log.",
        },
        {
          isCorrect: false,
          label:
            "Basing on the data, a limited conclusion was the team about the neighbourhood noise log.",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, because the team a limited conclusion about the neighbourhood noise log.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang pencatatan kebisingan lingkungan.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data menunjukkan simpulan terbatas tentang pencatatan kebisingan lingkungan.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan dari data, tim menarik simpulan terbatas tentang pencatatan kebisingan lingkungan.",
        },
        {
          isCorrect: false,
          label:
            "Data berdasarkan, simpulan terbatas ditarik tim tentang pencatatan kebisingan lingkungan.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, karena tim simpulan terbatas tentang pencatatan kebisingan lingkungan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
