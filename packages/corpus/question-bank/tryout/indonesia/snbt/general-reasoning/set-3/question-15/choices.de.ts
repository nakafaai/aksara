import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Tägliches Trinken von grünem Tee beseitigt Akne nachweislich.",
      value: false,
    },
    {
      label:
        "Oral eingenommener grüner Tee wird auf mögliche Hautwirkungen untersucht, doch die Evidenz rechtfertigt weder ein Heilversprechen bei Akne noch eine sichere Vorbeugung gegen lichtbedingte Hautalterung.",
      value: true,
    },
    {
      label:
        "Klinische Studien haben bewiesen, dass grüner Tee jede Form UV-bedingter Hautschädigung verhindert.",
      value: false,
    },
    {
      label: "Grüner Tee kann bewährten Sonnenschutz ersetzen.",
      value: false,
    },
    {
      label:
        "Konzentrierte Grünteepräparate sind nachweislich für alle Menschen sicher, weil sie pflanzlich sind.",
      value: false,
    },
  ],
};

export default choices;
