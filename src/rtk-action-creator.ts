export default undefined;

// Ausgangspunkt:

// In der Anwendung gibt es diverse handler-Funktionen, die beliebige Actions verarbeiten können.
//  Konvention: sie haben einen Parameter, der eine Action darstellt
// In Redux sind diese Action-Handler (sog. reducer-Funktionen) noch etwas komplexer und
//  außerdem in einem Objekt gehalten. Hier geben wir sie der einfachheithalber explizit an
// In Redux werden die Action-Objekte, die übergeben in der Regel nicht selbst erzeugt,
//  sondern mittels einer Factory-Funktion ("actionCreator").
//  Diese Funktion bekommt im einfachsten Fall den gewünschten Payload übergeben
//  und liefert eine Action zurück (mit type und payload)
//  Damit diese Funktionen nicht explizit geschrieben werden müssen, gibt es eine Hilfsfunktion
//   (in Redux createSlice)

type Action<AN = string> = { actionName: AN };

// Actions
function reset(): Action<"reset"> {
  // OK, gibt "reset" zurück
  return {
    actionName: "reset",
  };
}

function clear(): Action<"clear"> {
  // ERR: action-Name falsch
  return {
    actionName: "remove",
  };
}

type PayloadAction<PL, AN = string> = Action<AN> & {
  payload: PL;
};

// Payload einer fachlichen Action
type IncrementActionPayload = {
  value: number;
};

function newIncrementAction(
  value: number
): PayloadAction<IncrementActionPayload, "increment"> {
  return {
    actionName: "increment",
    payload: { value },
  };
}

const reducers = {
  increment(action: PayloadAction<IncrementActionPayload>) {
    action.payload.value.toFixed(); // OK, toFixed auf number definiert
    action.payload.vlue; // ERROR: value gibts nicht
  },
  reset() {
    // no payload at all
  },
};

function createIncrementAction(payload: IncrementActionPayload) {
  return {
    actionName: "increment",
    payload,
  } as const;
}

type GetActionFromReducerFunction<RF> = RF extends (arg: infer AT) => any
  ? AT
  : unknown;

// type IncrementAction = GetActionFromReducerFunction<typeof reducers.increment>;
// type ResetAction = GetActionFromReducerFunction<typeof reducers.reset>;

type GetPayloadFromAction<AT> = AT extends { payload: infer PayloadType }
  ? PayloadType
  : never;

type IncrementAction = GetPayloadFromAction<
  GetActionFromReducerFunction<typeof reducers.increment>
>; // IncrementActionPayload
type ResetAction = GetPayloadFromAction<
  GetActionFromReducerFunction<typeof reducers.reset>
>; // never

type GetPayloadFromHandlerFunction<RF> = GetPayloadFromAction<
  GetActionFromReducerFunction<RF>
>;

// Ergebnis-Objekt aus der makeActionCreator-Funktion, wenn das Action
//  Objekt ein payload-Property erwartet
// TODO: PayloadACtion<AN, PL> ?
type ActionCreatorWithPayload<AN extends string, PL> = (
  payload: PL
) => PayloadAction<PL, AN>;
// type ActionCreatorWithPayload<AN extends string, PL> = (payload: PL) => {
//   actionName: AN,
//   payload: PL
// };

// Action-Creator ohne Payload
// TODO: Action<AN>?
type ActionCreatorWithoutPayload<AN extends string> = () => Action<AN>;

// Ergebnis von makeActionCreator
// type ActionCreatorFunction<
//   T extends string,
//   HF extends Function
// > = GetPayloadFromHandlerFunction<HF> extends never
//   ? ActionCreatorWithoutPayload<T>
//   : ActionCreatorWithPayload<T, GetPayloadFromHandlerFunction<HF>>;

// https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919 🤯
// In RTK (createAction.d.ts):  ([E] extends [never] ? "..." : "..."
// type IsNeverType<PL> = [PL] extends [never] ? true : false;

type ActionCreatorFunction<AN extends string, PL> = [PL] extends [never]
  ? ActionCreatorWithoutPayload<AN>
  : ActionCreatorWithPayload<AN, PL>;

function makeActionCreator<AN extends string, RF extends Function>(
  actionName: AN,
  _fn: RF
): ActionCreatorFunction<
  AN,
  GetPayloadFromAction<GetActionFromReducerFunction<RF>>
> {
  const actionCreator = (...args: any[]) => {
    return {
      actionName,
      payload: args[0],
    };
  };

  return actionCreator;
}

// ------------------------------------------------------------
// VERWENDUNG 1 "Einfache Form":
// ------------------------------------------------------------
const incrementActionCreator = makeActionCreator(
  "increment",
  reducers.increment
);

const incrementAction = incrementActionCreator({
  value: 7,
});
incrementAction.actionName === "increment"; // OK
incrementAction.actionName === "decrement"; // ERROR
incrementAction.payload.value = 99; // OK
incrementAction.payload.value = ""; // ERROR Keine Zahl

const resetActionCreator = makeActionCreator("reset", reducers.reset);
const resetAction = resetActionCreator();
resetAction.actionName === "reset"; // OK
resetAction.actionName === "clear"; // ERROR
resetAction.payload; // ERROR kein Payload

// ------------------------------------------------------------
// VERWENDUNG 1 "Redux Toolkit":
// ------------------------------------------------------------
// im "echten" Redux Toolkit: die MakeActionCreator-Aufrufe sind im Redux-Framework,
//  der Verwender übergibt sein Slice mit den Reducern (hier nur Reducer bzw. handler)
//  und kommt dann liste mit Action-Creator-Funktionen zurück

type Reducers = Record<string, Function>;

type Actions<RS extends Reducers> = {
  [actionName in keyof RS]: ActionCreatorFunction<
    actionName extends string ? actionName : "",
    GetPayloadFromHandlerFunction<RS[actionName]>
  >;
};

function createActions<RS extends Reducers>(reducers: RS): Actions<RS> {
  const result: Record<string, Function> = {};
  Object.keys(reducers).forEach((actionName) => {
    const reducerFunction = reducers[actionName];

    result[actionName] = makeActionCreator(actionName, reducerFunction);
  });

  return result as any;
}

// in redux: createSlice
const x = createActions(reducers);

const incrementAction2 = x.increment({
  value: 7,
});
incrementAction2.actionName === "increment"; // OK
incrementAction2.actionName === "decrement"; // ERROR
incrementAction2.payload.value = 99; // OK
incrementAction2.payload.value = ""; // ERROR Keine Zahl
x.increment({ minus: 1 }); // ERROR invalid payload
x.increment(); // ERROR  no payload at all

const resetAction2 = x.reset();
resetAction2.actionName === "reset"; // OK
resetAction2.actionName === "clear"; // ERROR
resetAction2.payload; // ERROR kein Payload

const noWay = x.noway(); // keine Action
