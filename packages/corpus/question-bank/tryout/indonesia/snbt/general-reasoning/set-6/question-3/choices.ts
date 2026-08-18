import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Both activities are canceled because of the rain",
      value: false,
    },
    {
      label: "Recyclable materials are collected on Sunday",
      value: true,
    },
    {
      label: "Both activities are carried out on Sunday",
      value: false,
    },
    {
      label: "Only the drains are cleaned on Sunday",
      value: false,
    },
    {
      label: "The activity is postponed without choosing an alternative",
      value: false,
    },
  ],
  id: [
    {
      label: "Kedua kegiatan dibatalkan karena hujan",
      value: false,
    },
    {
      label: "Barang daur ulang dikumpulkan pada hari Minggu",
      value: true,
    },
    {
      label: "Kedua kegiatan dilaksanakan pada hari Minggu",
      value: false,
    },
    {
      label: "Hanya kegiatan membersihkan selokan yang dilaksanakan",
      value: false,
    },
    {
      label: "Kerja bakti ditunda tanpa memilih kegiatan pengganti",
      value: false,
    },
  ],
};

export default choices;
