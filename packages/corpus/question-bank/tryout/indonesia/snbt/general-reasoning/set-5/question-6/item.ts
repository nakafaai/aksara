import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Unternehmen B verzeichnete den höchsten prozentualen Anstieg",
        },
        {
          isCorrect: false,
          label: "Die Nutzerzahlen schwanken bei jedem Unternehmen",
        },
        {
          isCorrect: false,
          label: "Unternehmen B verzeichnete den größten prozentualen Rückgang",
        },
        {
          isCorrect: false,
          label: "Unternehmen B hat die höchste Dreimonatssumme",
        },
        {
          isCorrect: true,
          label: "Unternehmen C hat die niedrigste Dreimonatssumme",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The highest percentage increase was experienced by company B",
        },
        {
          isCorrect: false,
          label:
            "The number of smartphone users in every company is fluctuating",
        },
        {
          isCorrect: false,
          label: "The largest percentage decrease occurred in Company B",
        },
        {
          isCorrect: false,
          label: "Company B has the highest three-month total",
        },
        {
          isCorrect: true,
          label: "Company C has the lowest three-month total",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Persentase kenaikan tertinggi dialami oleh Perusahaan B",
        },
        {
          isCorrect: false,
          label:
            "Jumlah pengguna smartphone di setiap perusahaan selalu berfluktuasi",
        },
        {
          isCorrect: false,
          label: "Persentase penurunan terbesar terjadi di Perusahaan B",
        },
        {
          isCorrect: false,
          label: "Perusahaan B memiliki total tiga bulan tertinggi",
        },
        {
          isCorrect: true,
          label: "Perusahaan C memiliki total tiga bulan terendah",
        },
      ],
    },
  },
};

export default item;
