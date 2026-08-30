import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Die Online-Anmeldung ist ausgesetzt.", value: false },
    { label: "Die Serverwartung findet statt.", value: false },
    { label: "Die Serverwartung findet nicht statt.", value: true },
    { label: "Der Hinweis wurde versehentlich gelöscht.", value: false },
    { label: "Die Anmeldung ist dauerhaft geschlossen.", value: false },
  ],
  en: [
    { label: "Online registration is suspended.", value: false },
    { label: "Server maintenance is underway.", value: false },
    { label: "Server maintenance is not underway.", value: true },
    { label: "The notice was accidentally deleted.", value: false },
    { label: "Registration is permanently closed.", value: false },
  ],
  id: [
    { label: "Pendaftaran daring sedang dihentikan.", value: false },
    { label: "Pemeliharaan server sedang berlangsung.", value: false },
    { label: "Pemeliharaan server tidak sedang berlangsung.", value: true },
    { label: "Pemberitahuan terhapus secara tidak sengaja.", value: false },
    { label: "Pendaftaran ditutup secara permanen.", value: false },
  ],
};

export default choices;
