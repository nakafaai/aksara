import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das neue Büro liegt weiter von den Wohnungen der meisten Beschäftigten entfernt.",
        },
        {
          isCorrect: true,
          label:
            "Die meisten Kündigungen waren bereits vor der Bekanntgabe des Umzugs eingereicht worden.",
        },
        {
          isCorrect: false,
          label:
            "Durch den Umzug verdoppelte sich die durchschnittliche Pendelzeit.",
        },
        {
          isCorrect: false,
          label:
            "Die Miete des neuen Büros ist niedriger als die des bisherigen Büros.",
        },
        {
          isCorrect: false,
          label:
            "Das Unternehmen zog nach Ablauf des Mietvertrags für das bisherige Gebäude um.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The new office is farther from most employees' homes.",
        },
        {
          isCorrect: true,
          label:
            "Most resignation letters had been submitted before the relocation was announced.",
        },
        {
          isCorrect: false,
          label: "The relocation doubled the average commuting time.",
        },
        {
          isCorrect: false,
          label:
            "The rent at the new office is lower than at the former office.",
        },
        {
          isCorrect: false,
          label: "The company moved after the former building lease expired.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kantor baru lebih jauh dari rumah sebagian besar karyawan.",
        },
        {
          isCorrect: true,
          label:
            "Sebagian besar surat pengunduran diri telah diajukan sebelum rencana perpindahan diumumkan.",
        },
        {
          isCorrect: false,
          label:
            "Perpindahan itu menggandakan rata-rata waktu perjalanan ke kantor.",
        },
        {
          isCorrect: false,
          label: "Biaya sewa kantor baru lebih rendah daripada kantor lama.",
        },
        {
          isCorrect: false,
          label: "Perusahaan pindah setelah masa sewa gedung lama berakhir.",
        },
      ],
    },
  },
};

export default item;
