export default undefined;

type Endpoint = {
  url: string;
  method: "GET" | "POST";
};

type EndpointConfig = Record<string, Endpoint>;

const endpoints = {
  getPost: {
    url: "https://myapp.de/api/posts",
    method: "GET",
  },

  updateUser: {
    url: "https://myapp.de/api/users",
    method: "POST",
  },
} as const;

// keyof-Operator
type Keys = keyof typeof endpoints;
const getPostKey: Keys = "getPost"; //OK
const removeUserKey: Keys = "removeUser"; // ERR: removeUser gibt es nicht in 'endpoints'

// Capitalize in JavaScript
// getPosts => GetPosts
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Capitalize in TypeScript, auf Typ-Ebene
type EndpointName = typeof getPostKey; // "getPost"
type FunctionName = `use${Capitalize<EndpointName>}`; // "useGetPost"
const useGetPost: FunctionName = "useGetPost"; // OK
const getPost: FunctionName = "getPost"; // ERROR

// Generischer Typ wie FunctionName, aber der umzuwandelnde Typ
// kann übergeben werden und hinten wird "Query" drangehängt
type QueryFn<T extends string> = `use${Capitalize<T>}Query`;
type QueryFunctions = QueryFn<keyof typeof endpoints>;

const useGetPostQueryFn: QueryFunctions = "useGetPostQuery"; // OK
const useRemovePostQueryFn: QueryFunctions = "useRemovePostQuery"; // ERR

/** Ausgelassen, implementierung für Beispiel irrelevant */
declare function createApiHook(endpoint: Endpoint): Function;

type Api<E extends EndpointConfig> = {
  [K in Extract<keyof E, string> as QueryFn<K>]: Function;
};

function createApi<E extends EndpointConfig>(endpoints: E): Api<E> {
  const result: Record<string, Function> = {};
  Object.keys(endpoints).forEach((name) => {
    // name ist z.B. getPost, updateUser, ...
    const endpointFn = endpoints[name];
    const hookFunctionName = `use${capitalize(name)}`;
    result[hookFunctionName] = createApiHook(endpointFn);
  });

  return result as any;
}

const hooks = createApi(endpoints);
hooks.useGetPostQuery();
hooks.useUpdateUserQuery();
hooks.useRemoveUserQuery();

// Exemplarisch: zweite Verwendung von createApi

const bankEndpoints = {
  getTransactions: {
    url: "https://my-bank.de/api/transactions",
    method: "GET",
  },
  createTransactions: {
    url: "https://my-bank.de/api/transactions",
    method: "POST",
  },
} as const;

const bankHooks = createApi(bankEndpoints);
bankHooks.useCreateTransactionsQuery(); //OK
bankHooks.useGetTransactionsQuery(); // OK
bankHooks.deleteAccount(); // ERROR
