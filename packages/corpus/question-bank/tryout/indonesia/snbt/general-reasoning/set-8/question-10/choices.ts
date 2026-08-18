import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "The overflow gate definitely opens automatically.",
      value: false,
    },
    {
      label: "The western beds definitely remain dry.",
      value: false,
    },
    {
      label: "No water can reach the western beds.",
      value: false,
    },
    {
      label: "The western beds cannot become green.",
      value: false,
    },
    {
      label: "It cannot be concluded whether the western beds receive water.",
      value: true,
    },
  ],
  id: [
    {
      label: "Pintu pelimpah pasti terbuka secara otomatis.",
      value: false,
    },
    {
      label: "Petak tanaman bagian barat pasti tetap kering.",
      value: false,
    },
    {
      label: "Tidak ada air yang dapat mencapai petak tanaman bagian barat.",
      value: false,
    },
    {
      label: "Petak tanaman bagian barat tidak mungkin menghijau.",
      value: false,
    },
    {
      label:
        "Tidak dapat disimpulkan apakah petak tanaman bagian barat menerima air.",
      value: true,
    },
  ],
};

export default choices;
