import { igcseCourseNodes } from "#corpus/curriculum/cambridge-international/igcse/subjects";
import { defineCurriculum, stageNode } from "#corpus/curriculum/schema";
import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

/** Lazily validates the complete authored Cambridge curriculum tree. */
export const cambridgeInternationalCurriculum = defineCurriculum({
  programKey: LEARNING_PROGRAM_KEYS.cambridgeInternational,
  tree: [
    stageNode({
      displayGroup: {
        de: { title: "Lernstufen" },
        en: { title: "Learning stages" },
        id: { title: "Tahap belajar" },
      },
      displayGroupIconKey: "school",
      iconKey: "early-years",
      key: "early-years",
      order: 10,
      translations: {
        de: { routeSlug: "fruehe-bildung", title: "Frühkindliche Bildung" },
        en: {
          routeSlug: "early-years",
          title: "Early Years",
        },
        id: {
          routeSlug: "early-years",
          title: "Early Years",
        },
      },
    }),
    stageNode({
      displayGroup: {
        de: { title: "Lernstufen" },
        en: { title: "Learning stages" },
        id: { title: "Tahap belajar" },
      },
      displayGroupIconKey: "school",
      iconKey: "primary-school",
      key: "primary",
      order: 20,
      translations: {
        de: { routeSlug: "grundschule", title: "Grundschule" },
        en: {
          routeSlug: "primary",
          title: "Primary",
        },
        id: {
          routeSlug: "primary",
          title: "Primary",
        },
      },
    }),
    stageNode({
      displayGroup: {
        de: { title: "Lernstufen" },
        en: { title: "Learning stages" },
        id: { title: "Tahap belajar" },
      },
      displayGroupIconKey: "school",
      iconKey: "middle-school",
      key: "lower-secondary",
      order: 30,
      translations: {
        de: { routeSlug: "sekundarstufe-1", title: "Sekundarstufe I" },
        en: {
          routeSlug: "lower-secondary",
          title: "Lower Secondary",
        },
        id: {
          routeSlug: "lower-secondary",
          title: "Lower Secondary",
        },
      },
    }),
    stageNode({
      children: igcseCourseNodes,
      displayGroup: {
        de: { title: "Lernstufen" },
        en: { title: "Learning stages" },
        id: { title: "Tahap belajar" },
      },
      displayGroupIconKey: "school",
      iconKey: "high-school",
      key: "upper-secondary",
      order: 40,
      translations: {
        de: { routeSlug: "sekundarstufe-2", title: "Sekundarstufe II" },
        en: {
          routeSlug: "upper-secondary",
          title: "Upper Secondary",
        },
        id: {
          routeSlug: "upper-secondary",
          title: "Upper Secondary",
        },
      },
    }),
    stageNode({
      displayGroup: {
        de: { title: "Lernstufen" },
        en: { title: "Learning stages" },
        id: { title: "Tahap belajar" },
      },
      displayGroupIconKey: "school",
      iconKey: "advanced",
      key: "advanced",
      order: 50,
      translations: {
        de: { routeSlug: "fortgeschritten", title: "Fortgeschrittene Stufe" },
        en: {
          routeSlug: "advanced",
          title: "Advanced",
        },
        id: {
          routeSlug: "advanced",
          title: "Advanced",
        },
      },
    }),
  ],
});
