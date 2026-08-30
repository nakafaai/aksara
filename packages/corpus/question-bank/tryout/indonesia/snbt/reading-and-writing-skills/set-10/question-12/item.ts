import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team kleine Karten mit Gehzeiten im Kontext Informationsstelle im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team kleine Karten mit Gehzeiten im Kontext Informationsstelle im Stadtpark.",
        },
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team kleine Karten mit Gehzeiten im folgenden Kontext: Informationsstelle im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team kleine Karten mit Gehzeiten im Kontext Informationsstelle im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team kleine Karten mit Gehzeiten im Kontext Informationsstelle im Stadtpark",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "on Monday, the team tested small maps showing walking times in this setting (city park information desk).",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested small maps showing walking times in this setting (city park information desk).",
        },
        {
          isCorrect: true,
          label:
            "On Monday, the team tested small maps showing walking times in this setting (city park information desk).",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested small maps showing walking times in this setting (city park information desk).",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested small maps showing walking times in this setting (city park information desk)",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji peta kecil yang menampilkan waktu tempuh di pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji peta kecil yang menampilkan waktu tempuh di pusat informasi taman kota.",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji peta kecil yang menampilkan waktu tempuh di pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji peta kecil yang menampilkan waktu tempuh di pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji peta kecil yang menampilkan waktu tempuh di pusat informasi taman kota",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
