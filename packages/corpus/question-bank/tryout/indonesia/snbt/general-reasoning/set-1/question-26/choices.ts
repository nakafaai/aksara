import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Alle geschulten Personen sind Laborassistenten.", value: false },
    { label: "Einige Laborassistenten sind ehrenamtlich tätig.", value: false },
    {
      label: "Einige geschulte Personen gehören nicht zum bezahlten Personal.",
      value: true,
    },
    {
      label: "Kein Laborassistent gehört zum bezahlten Personal.",
      value: false,
    },
    {
      label: "Alle bezahlten Mitarbeiter sind Laborassistenten.",
      value: false,
    },
  ],
  en: [
    {
      label: "Everyone with safety training is a laboratory assistant.",
      value: false,
    },
    { label: "Some laboratory assistants are volunteers.", value: false },
    {
      label: "Some people with safety training are not paid staff.",
      value: true,
    },
    { label: "No laboratory assistant is paid staff.", value: false },
    { label: "All paid staff are laboratory assistants.", value: false },
  ],
  id: [
    {
      label: "Semua peserta pelatihan adalah asisten laboratorium.",
      value: false,
    },
    { label: "Sebagian asisten laboratorium adalah relawan.", value: false },
    { label: "Sebagian peserta pelatihan bukan staf bergaji.", value: true },
    {
      label: "Tidak ada asisten laboratorium yang menjadi staf bergaji.",
      value: false,
    },
    { label: "Semua staf bergaji adalah asisten laboratorium.", value: false },
  ],
};

export default choices;
