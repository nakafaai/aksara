import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "A single weight measurement is enough to prove that a child is completely healthy.",
      value: false,
    },
    {
      label:
        "Head circumference alone determines a child's nutritional status at every age.",
      value: false,
    },
    {
      label:
        "Any increase in weight or height automatically means that growth is appropriate.",
      value: false,
    },
    {
      label:
        "Child growth is assessed with several age-appropriate measurements and their pattern over time.",
      value: true,
    },
    {
      label:
        "Growth charts replace all other professional assessment of a child's health.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Satu kali pengukuran berat badan cukup untuk membuktikan bahwa seorang anak sepenuhnya sehat.",
      value: false,
    },
    {
      label:
        "Lingkar kepala saja menentukan status gizi anak pada semua kelompok umur.",
      value: false,
    },
    {
      label:
        "Setiap kenaikan berat atau tinggi badan otomatis berarti pertumbuhan anak sudah sesuai.",
      value: false,
    },
    {
      label:
        "Pertumbuhan anak dinilai melalui beberapa pengukuran yang sesuai dengan umur serta polanya dari waktu ke waktu.",
      value: true,
    },
    {
      label:
        "Kurva pertumbuhan menggantikan seluruh penilaian profesional lain terhadap kesehatan anak.",
      value: false,
    },
  ],
};

export default choices;
