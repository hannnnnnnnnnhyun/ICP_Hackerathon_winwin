export const idlFactory = ({ IDL }) => {
  return IDL.Service({
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
    'insertBet' : IDL.Func([IDL.Principal, IDL.Principal], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
