import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "It uses a different sealing method from Group A.", value: false },
    {
      label: "It has all the same characteristics as packages in Group A.",
      value: false,
    },
    {
      label: "It uses the same sealing method as packages in Group A.",
      value: true,
    },
    {
      label: "It has the same serial number as packages in Group A.",
      value: false,
    },
    {
      label: "It passed the same inspections as packages in Group A.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Paket itu menggunakan cara penyegelan yang berbeda dari Kelompok A.",
      value: false,
    },
    {
      label:
        "Paket itu memiliki semua ciri yang sama dengan paket dalam Kelompok A.",
      value: false,
    },
    {
      label:
        "Paket itu menggunakan cara penyegelan yang sama dengan paket dalam Kelompok A.",
      value: true,
    },
    {
      label:
        "Paket itu memiliki nomor seri yang sama dengan paket dalam Kelompok A.",
      value: false,
    },
    {
      label:
        "Paket itu telah melalui pemeriksaan yang sama dengan paket dalam Kelompok A.",
      value: false,
    },
  ],
};

export default choices;
