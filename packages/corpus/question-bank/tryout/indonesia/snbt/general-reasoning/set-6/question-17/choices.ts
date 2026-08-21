import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Am vergangenen Sonntag ereignete sich in Kampung Bambu keine Straftat.",
      value: false,
    },
    {
      label:
        "Am vergangenen Sonntag ereignete sich in Kampung Bambu kein Diebstahl.",
      value: false,
    },
    {
      label:
        "Am vergangenen Sonntag ereignete sich in Kampung Bambu ein Diebstahl.",
      value: true,
    },
    {
      label:
        "Die verbesserte Sicherheit verhinderte am vergangenen Sonntag jede Straftat.",
      value: false,
    },
    {
      label:
        "Seit dem vergangenen Sonntag ereignete sich in Kampung Bambu keine Straftat.",
      value: false,
    },
  ],
  en: [
    { label: "No crime occurred in Kampung Bambu last Sunday.", value: false },
    { label: "No theft occurred in Kampung Bambu last Sunday.", value: false },
    { label: "A theft occurred in Kampung Bambu last Sunday.", value: true },
    {
      label: "Improved security prevented every crime last Sunday.",
      value: false,
    },
    {
      label: "No crime has occurred in Kampung Bambu since last Sunday.",
      value: false,
    },
  ],
  id: [
    {
      label: "Tidak terjadi kejahatan di Kampung Bambu pada hari Minggu lalu.",
      value: false,
    },
    {
      label: "Tidak terjadi pencurian di Kampung Bambu pada hari Minggu lalu.",
      value: false,
    },
    {
      label: "Terjadi pencurian di Kampung Bambu pada hari Minggu lalu.",
      value: true,
    },
    {
      label:
        "Peningkatan keamanan mencegah seluruh kejahatan pada hari Minggu lalu.",
      value: false,
    },
    {
      label: "Tidak terjadi kejahatan di Kampung Bambu sejak hari Minggu lalu.",
      value: false,
    },
  ],
};

export default choices;
