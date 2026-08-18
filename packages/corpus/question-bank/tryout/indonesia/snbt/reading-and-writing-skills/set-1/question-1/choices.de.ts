import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Verschobene Jahreszeiten, die Aussaat und Ernte erschweren.",
      value: false,
    },
    {
      label: "Meeresspiegelanstieg und Küstenhochwasser.",
      value: false,
    },
    {
      label: "Dürren und Überschwemmungen, die Nutzpflanzen schädigen können.",
      value: true,
    },
    {
      label: "Ein wachsendes Risiko durch Pflanzenschädlinge oder Krankheiten.",
      value: false,
    },
    {
      label: "Höhere Temperaturen, die die Nahrungsmittelproduktion belasten.",
      value: false,
    },
  ],
};

export default choices;
