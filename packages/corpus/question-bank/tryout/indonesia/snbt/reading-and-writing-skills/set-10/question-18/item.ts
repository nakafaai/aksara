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
            "Auf Grundlage der Daten eine begrenzte Schlussfolgerung für den Kontext Informationsschalter im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten kam das Team zu einer Schlussfolgerung, die begrenzt war, im Kontext Informationsschalter im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten führten zu einer begrenzten Schlussfolgerung, weil Kontext Informationsschalter im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten zog es eine begrenzte Schlussfolgerung für den Kontext Informationsschalter im Stadtpark.",
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
            "Based on the data, a limited conclusion for this setting (city park information desk).",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, the team reached a conclusion, which was limited, in this setting (city park information desk).",
        },
        {
          isCorrect: false,
          label:
            "The data led to a limited conclusion because this setting (city park information desk).",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, it reached a limited conclusion for this setting (city park information desk).",
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
            "Berdasarkan data, sebuah simpulan terbatas untuk konteks meja informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, tim sampai pada simpulan, yang terbatas, dalam konteks meja informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Data menghasilkan simpulan terbatas karena konteks meja informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, hal itu menarik simpulan terbatas untuk konteks meja informasi taman kota.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
