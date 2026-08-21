import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Anwohner verloren ihre Motorräder",
      value: false,
    },
    {
      label: "Die Bewohner sind ängstlich und unruhig",
      value: false,
    },
    {
      label: "In Gang Mawar kommt es fast jede Woche zu Diebstählen",
      value: false,
    },
    {
      label: "Sicherheitskräfte patrouillieren nicht regelmäßig",
      value: false,
    },
    {
      label: "Der Sicherheitsdienst patrouilliert regelmäßig",
      value: true,
    },
  ],
  en: [
    { label: "Residents lost their motorcycles", value: false },
    { label: "Residents are anxious and restless", value: false },
    { label: "Theft occurs almost every week in Gang Mawar", value: false },
    { label: "Security guards do not patrol regularly", value: false },
    { label: "Security guards patrol regularly", value: true },
  ],
  id: [
    { label: "Warga kehilangan motor", value: false },
    { label: "Warga resah dan gelisah", value: false },
    {
      label: "Hampir setiap minggu terjadi pencurian di Gang Mawar",
      value: false,
    },
    { label: "Petugas keamanan tidak berpatroli secara rutin", value: false },
    { label: "Petugas keamanan berpatroli secara rutin", value: true },
  ],
};

export default choices;
