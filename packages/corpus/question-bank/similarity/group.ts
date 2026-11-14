import {
  Array as Arr,
  MutableHashMap,
  MutableList,
  Option,
  pipe,
} from "effect";

/** Adds one item to the list kept under one key. */
export function collect<Item>(
  map: MutableHashMap.MutableHashMap<string, MutableList.MutableList<Item>>,
  key: string,
  item: Item
) {
  const list = Option.getOrUndefined(MutableHashMap.get(map, key));
  if (list === undefined) {
    const created = MutableList.make<Item>();
    MutableList.append(created, item);
    MutableHashMap.set(map, key, created);
    return;
  }
  MutableList.append(list, item);
}

/** Lists each unordered pair of one group once when either side is a target. */
export function pairs<Item>(
  group: readonly Item[],
  isTarget: (item: Item) => boolean
) {
  return Arr.flatMap(group, (left, index) =>
    pipe(
      Arr.drop(group, index + 1),
      Arr.filter((right) => isTarget(left) || isTarget(right)),
      Arr.map((right) => ({ left, right }))
    )
  );
}
