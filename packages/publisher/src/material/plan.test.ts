import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { planMaterialEntries } from "#publisher/material/plan";

const entries = await Effect.runPromise(
  decodeMaterialRegistry().pipe(
    Effect.flatMap((decoded) => {
      const english = decoded.find(({ route }) => route.locale === "en");
      const indonesian = decoded.find(({ route }) => route.locale === "id");
      if (!(english && indonesian)) {
        return Effect.dieMessage("Expected the two real material locales.");
      }
      return Effect.succeed([english, indonesian] as const);
    })
  )
);
const [englishEntry, indonesianEntry] = entries;

/** Derives prior content-head state without duplicating compiler identity. */
function previousHeads() {
  return entries.map(({ route }) => ({
    contentKey: route.contentKey,
    locale: route.locale,
  }));
}

describe("material plan", () => {
  it("turns a removed locale into one correctly identified tombstone", () => {
    const tasks = planMaterialEntries([indonesianEntry], previousHeads());

    expect(
      tasks.map((task) =>
        task.kind === "delete"
          ? {
              contentKey: task.change.contentKey,
              kind: task.kind,
              locale: task.change.locale,
            }
          : {
              contentKey: task.entry.route.contentKey,
              kind: task.kind,
              locale: task.entry.route.locale,
            }
      )
    ).toEqual([
      {
        contentKey: englishEntry.route.contentKey,
        kind: "delete",
        locale: "en",
      },
      {
        contentKey: indonesianEntry.route.contentKey,
        kind: "upsert",
        locale: "id",
      },
    ]);
  });

  it("plans a new content identity together with its prior tombstone", () => {
    const renamedKey = ContentKeySchema.make(
      `${englishEntry.route.contentKey}-renamed`
    );
    const renamed = {
      ...englishEntry,
      route: { ...englishEntry.route, contentKey: renamedKey },
    };
    const tasks = planMaterialEntries(
      [renamed, indonesianEntry],
      previousHeads()
    );
    const englishTasks = tasks.filter((task) =>
      task.kind === "delete"
        ? task.change.locale === "en"
        : task.entry.route.locale === "en"
    );

    expect(englishTasks).toHaveLength(2);
    expect(englishTasks[0]).toMatchObject({
      change: {
        contentKey: englishEntry.route.contentKey,
        locale: "en",
        operation: "delete",
      },
      kind: "delete",
    });
    expect(englishTasks[1]).toMatchObject({
      entry: { route: { contentKey: renamedKey, locale: "en" } },
      kind: "upsert",
      previousCache: undefined,
    });
  });
});
