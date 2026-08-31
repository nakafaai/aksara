import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "dieselbe Einladung verschicken, ohne Teilnahmehindernisse zu bearbeiten",
        },
        {
          isCorrect: true,
          label:
            "Gruppen mit unterschiedlichen Bedürfnissen und Hindernissen tatsächlich einbeziehend",
        },
        {
          isCorrect: false,
          label: "jeden Vorschlag annehmen, damit keine Gruppe enttäuscht ist",
        },
        {
          isCorrect: false,
          label:
            "die Entscheidung vollständig der größten anwesenden Gruppe überlassen",
        },
        {
          isCorrect: false,
          label: "Beteiligung ausschließlich an der Zahl der Anwesenden messen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "issuing the same invitation without addressing participants' barriers",
        },
        {
          isCorrect: true,
          label:
            "providing practical opportunity to groups with different needs and barriers",
        },
        {
          isCorrect: false,
          label: "accepting every proposal so that no group is disappointed",
        },
        {
          isCorrect: false,
          label:
            "leaving the decision entirely to the group with the highest attendance",
        },
        {
          isCorrect: false,
          label:
            "measuring participation solely by the number of people present",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "memberi undangan yang sama tanpa menyesuaikan hambatan peserta",
        },
        {
          isCorrect: true,
          label:
            "membuka kesempatan nyata bagi kelompok dengan kebutuhan dan hambatan yang berbeda",
        },
        {
          isCorrect: false,
          label: "menerima setiap usulan agar tidak ada kelompok yang kecewa",
        },
        {
          isCorrect: false,
          label:
            "menyerahkan keputusan sepenuhnya kepada kelompok yang hadir paling banyak",
        },
        {
          isCorrect: false,
          label: "mengukur keterlibatan hanya dari jumlah orang yang datang",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
