import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Sinta erhält eine Gehaltsüberprüfung, nimmt aber nicht am Beförderungsverfahren teil.",
      value: false,
    },
    {
      label:
        "Sinta erhält eine Gehaltsüberprüfung und nimmt am Beförderungsverfahren teil.",
      value: true,
    },
    {
      label:
        "Sinta erhält weder eine Gehaltsüberprüfung noch ein Beförderungsverfahren.",
      value: false,
    },
    {
      label:
        "Sinta nimmt ohne Gehaltsüberprüfung am Beförderungsverfahren teil.",
      value: false,
    },
    {
      label: "Sinta hat die berufliche Zertifizierung nicht abgeschlossen.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "Sinta receives a salary review but does not enter the promotion assessment.",
      value: false,
    },
    {
      label:
        "Sinta receives a salary review and enters the promotion assessment.",
      value: true,
    },
    {
      label:
        "Sinta receives neither a salary review nor a promotion assessment.",
      value: false,
    },
    {
      label:
        "Sinta enters the promotion assessment without receiving a salary review.",
      value: false,
    },
    {
      label: "Sinta has not completed the professional certification.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Sinta menerima peninjauan gaji, tetapi tidak mengikuti penilaian promosi.",
      value: false,
    },
    {
      label: "Sinta menerima peninjauan gaji dan mengikuti penilaian promosi.",
      value: true,
    },
    {
      label: "Sinta tidak menerima peninjauan gaji maupun penilaian promosi.",
      value: false,
    },
    {
      label:
        "Sinta mengikuti penilaian promosi tanpa menerima peninjauan gaji.",
      value: false,
    },
    { label: "Sinta belum menyelesaikan sertifikasi profesi.", value: false },
  ],
};

export default choices;
