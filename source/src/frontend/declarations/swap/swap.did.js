export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'LedgerToToken' : IDL.Func([], [IDL.Bool], []),
    'TokenToLedger' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'get' : IDL.Func([], [IDL.Nat], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
