import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "The highest percentage increase was experienced by company B",
      value: false,
    },
    {
      label: "The number of smartphone users in every company is fluctuating",
      value: false,
    },
    {
      label: "The largest percentage decrease occurred in Company B",
      value: false,
    },
    {
      label: "Company C has the lowest three-month total",
      value: true,
    },
    {
      label: "Company B has the highest three-month total",
      value: false,
    },
  ],
  id: [
    {
      label: "Persentase kenaikan tertinggi dialami oleh Perusahaan B",
      value: false,
    },
    {
      label:
        "Jumlah pengguna smartphone di setiap perusahaan selalu berfluktuasi",
      value: false,
    },
    {
      label: "Persentase penurunan terbesar terjadi di Perusahaan B",
      value: false,
    },
    {
      label: "Perusahaan C memiliki total tiga bulan terendah",
      value: true,
    },
    {
      label: "Perusahaan B memiliki total tiga bulan tertinggi",
      value: false,
    },
  ],
};

export default choices;
