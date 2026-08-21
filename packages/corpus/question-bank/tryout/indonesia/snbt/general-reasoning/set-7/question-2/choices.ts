import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Nicht entfernte Plaque kann zu Zahnstein verhärten.",
      value: false,
    },
    {
      label:
        "Zahnstein unterhalb des Zahnfleischrandes kann das Zahnfleisch reizen.",
      value: false,
    },
    {
      label:
        "Rotes, geschwollenes oder blutendes Zahnfleisch kann auf Gingivitis hinweisen.",
      value: false,
    },
    {
      label:
        "Jede Zahnfleischschwellung wird ausschließlich durch Plaque oder Zahnstein verursacht.",
      value: true,
    },
    {
      label:
        "Bereits gebildeter Zahnstein muss von einer zahnmedizinischen Fachkraft entfernt werden.",
      value: false,
    },
  ],
  en: [
    {
      label: "Plaque that is not removed can harden into tartar.",
      value: false,
    },
    {
      label: "Tartar below the gumline can irritate the gums.",
      value: false,
    },
    {
      label: "Red, swollen, or bleeding gums can be signs of gingivitis.",
      value: false,
    },
    {
      label: "Every case of swollen gums is caused only by plaque or tartar.",
      value: true,
    },
    {
      label: "A dental professional must remove tartar after it has formed.",
      value: false,
    },
  ],
  id: [
    {
      label: "Plak yang tidak dibersihkan dapat mengeras menjadi karang gigi.",
      value: false,
    },
    {
      label: "Karang gigi di bawah garis gusi dapat mengiritasi gusi.",
      value: false,
    },
    {
      label:
        "Gusi merah, bengkak, atau berdarah dapat menjadi tanda gingivitis.",
      value: false,
    },
    {
      label:
        "Setiap kasus gusi bengkak hanya disebabkan oleh plak atau karang gigi.",
      value: true,
    },
    {
      label:
        "Tenaga kesehatan gigi harus membersihkan karang gigi yang sudah terbentuk.",
      value: false,
    },
  ],
};

export default choices;
