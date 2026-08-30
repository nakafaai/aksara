import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Das neue Büro liegt weiter von den Wohnungen der meisten Beschäftigten entfernt.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die meisten Kündigungen waren bereits vor der Bekanntgabe des Umzugs eingereicht worden.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Durch den Umzug verdoppelte sich die durchschnittliche Pendelzeit.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Miete des neuen Büros ist niedriger als die des bisherigen Büros.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Das Unternehmen zog nach Ablauf des Mietvertrags für das bisherige Gebäude um.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The new office is farther from most employees' homes.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Most resignation letters had been submitted before the relocation was announced.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The relocation doubled the average commuting time.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The rent at the new office is lower than at the former office.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The company moved after the former building lease expired.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kantor baru lebih jauh dari rumah sebagian besar karyawan.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sebagian besar surat pengunduran diri telah diajukan sebelum rencana perpindahan diumumkan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Perpindahan itu menggandakan rata-rata waktu perjalanan ke kantor.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Biaya sewa kantor baru lebih rendah daripada kantor lama.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Perusahaan pindah setelah masa sewa gedung lama berakhir.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
