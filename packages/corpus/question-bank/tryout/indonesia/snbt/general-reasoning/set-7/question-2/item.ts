import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nicht entfernte Plaque kann zu Zahnstein verhärten.",
        },
        {
          isCorrect: false,
          label:
            "Zahnstein unterhalb des Zahnfleischrandes kann das Zahnfleisch reizen.",
        },
        {
          isCorrect: false,
          label:
            "Rotes, geschwollenes oder blutendes Zahnfleisch kann auf Gingivitis hinweisen.",
        },
        {
          isCorrect: true,
          label:
            "Jede Zahnfleischschwellung wird ausschließlich durch Plaque oder Zahnstein verursacht.",
        },
        {
          isCorrect: false,
          label:
            "Bereits gebildeter Zahnstein muss von einer zahnmedizinischen Fachkraft entfernt werden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Plaque that is not removed can harden into tartar.",
        },
        {
          isCorrect: false,
          label: "Tartar below the gumline can irritate the gums.",
        },
        {
          isCorrect: false,
          label: "Red, swollen, or bleeding gums can be signs of gingivitis.",
        },
        {
          isCorrect: true,
          label:
            "Every case of swollen gums is caused only by plaque or tartar.",
        },
        {
          isCorrect: false,
          label:
            "A dental professional must remove tartar after it has formed.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Plak yang tidak dibersihkan dapat mengeras menjadi karang gigi.",
        },
        {
          isCorrect: false,
          label: "Karang gigi di bawah garis gusi dapat mengiritasi gusi.",
        },
        {
          isCorrect: false,
          label:
            "Gusi merah, bengkak, atau berdarah dapat menjadi tanda gingivitis.",
        },
        {
          isCorrect: true,
          label:
            "Setiap kasus gusi bengkak hanya disebabkan oleh plak atau karang gigi.",
        },
        {
          isCorrect: false,
          label:
            "Tenaga kesehatan gigi harus membersihkan karang gigi yang sudah terbentuk.",
        },
      ],
    },
  },
};

export default item;
