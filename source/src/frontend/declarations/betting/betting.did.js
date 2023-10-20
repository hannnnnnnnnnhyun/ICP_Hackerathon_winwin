export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'bet' : IDL.Func([IDL.Principal, IDL.Principal], [IDL.Bool], []),
    'createBetting' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Record({
            'id' : IDL.Principal,
            'bets' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Principal,
                'users' : IDL.Vec(IDL.Principal),
              })
            ),
            'finish' : IDL.Bool,
            'totalAmount' : IDL.Nat,
          }),
        ],
        [],
      ),
    'exitBetting' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'insertBet' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [
          IDL.Record({
            'id' : IDL.Principal,
            'bets' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Principal,
                'users' : IDL.Vec(IDL.Principal),
              })
            ),
            'finish' : IDL.Bool,
            'totalAmount' : IDL.Nat,
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
